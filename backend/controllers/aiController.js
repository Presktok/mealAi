import { GoogleGenerativeAI } from '@google/generative-ai'
import Meal from '../models/Meal.js'
import { AppError } from '../middleware/errorHandler.js'

export const recommendMeals = async (req, res) => {
  try {
    const { query } = req.body

    if (!query) {
      throw new AppError('Query is required for AI recommendation', 400)
    }

    // 1. Fetch all available meals to send to the AI
    const allMeals = await Meal.find().select('_id title category mood').lean()
    
    // 2. Initialize Gemini API (if key exists)
    const apiKey = process.env.GEMINI_API_KEY
    
    if (apiKey && apiKey !== 'your_key_here') {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const prompt = `
        You are a highly empathetic and knowledgeable food delivery assistant called MoodMeal AI.
        A user has just said: "${query}"
        
        Here is the JSON list of available meals in our database:
        ${JSON.stringify(allMeals)}
        
        Task:
        1. Empathize with the user's emotional state or craving.
        2. Pick the top 3 best matching meals from the available list that fit their query perfectly.
        
        You MUST return ONLY a raw JSON object (without markdown wrappers like \`\`\`json) with exactly this structure:
        {
          "message": "A friendly, empathetic 2-sentence message explaining why you picked these foods for them.",
          "recommendedIds": ["id1", "id2", "id3"]
        }
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      try {
        // Strip out potential markdown formatting in case Gemini disobeys
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
        const parsed = JSON.parse(jsonStr)
        
        // Fetch the fully populated meals based on the IDs Gemini returned
        const recommendedMeals = await Meal.find({ _id: { $in: parsed.recommendedIds } })
        
        return res.status(200).json({
          success: true,
          message: parsed.message,
          data: recommendedMeals
        })
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", text)
        throw new AppError('Failed to process AI response', 500)
      }
    } else {
      // 3. FALLBACK MOCK (If no API key provided)
      console.log("No GEMINI_API_KEY found. Using fallback mock AI response.")
      
      // Just pick 3 random meals or specific ones
      const shuffled = allMeals.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 3)
      
      const recommendedMeals = await Meal.find({ _id: { $in: selected.map(m => m._id) } })
      
      return res.status(200).json({
        success: true,
        message: "I hear you! I'm currently running in 'Simulation Mode' since my Gemini API Key hasn't been added yet, but based on what you said, I think these comforting meals would really hit the spot right now!",
        data: recommendedMeals
      })
    }
    
  } catch (err) {
    console.error("AI Recommendation Error:", err)
    res.status(err.statusCode || 500).json({ 
      success: false, 
      error: err.message || 'Server error processing AI request' 
    })
  }
}
