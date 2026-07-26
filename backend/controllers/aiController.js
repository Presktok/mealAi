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
    
    const runFallback = async (reason) => {
      console.log(`Using fallback mock AI response. Reason: ${reason}`)
      const shuffled = allMeals.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 3)
      const recommendedMeals = await Meal.find({ _id: { $in: selected.map(m => m._id) } })
      
      return res.status(200).json({
        success: true,
        message: `I hear you! I'm currently running in 'Simulation Mode' since ${reason}, but based on what you said, I think these comforting meals would really hit the spot right now!`,
        data: recommendedMeals
      })
    }
    
    // 2. Initialize Gemini API (if key exists)
    const apiKey = process.env.GEMINI_API_KEY
    
    if (apiKey && apiKey !== 'your_key_here') {
      try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" })

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
          const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim()
          const parsed = JSON.parse(jsonStr)
          
          const recommendedMeals = await Meal.find({ _id: { $in: parsed.recommendedIds } })
          
          return res.status(200).json({
            success: true,
            message: parsed.message,
            data: recommendedMeals
          })
        } catch (parseError) {
          console.error("Failed to parse Gemini response:", text)
          return runFallback("the API response couldn't be parsed")
        }
      } catch (geminiError) {
        console.error("Gemini API request failed:", geminiError.message)
        return runFallback("I couldn't connect to the Gemini API (network issue)")
      }
    } else {
      return runFallback("my Gemini API Key hasn't been added yet")
    }
    
  } catch (err) {
    console.error("AI Recommendation Error:", err)
    res.status(err.statusCode || 500).json({ 
      success: false, 
      error: err.message || 'Server error processing AI request' 
    })
  }
}
