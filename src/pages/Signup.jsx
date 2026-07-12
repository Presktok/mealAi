import { useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        name,
        email,
        password,
      });

      if (resp.data.success) {
        setMessage("Account created successfully! Logging you in...");
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', resp.data.data.token);
        window.dispatchEvent(new Event('auth-change'));
        setTimeout(() => navigate('/dashboard'), 1500);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed.");
      console.error(err);
    }
  };

  return (
    <PageLayout variant="content" hideFooter hideSearch>
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 text-center text-white">
          <h1 className="text-3xl font-black italic tracking-tighter">MoodMeal AI</h1>
          <p className="mt-2 text-sm opacity-90">Create a free account</p>
        </div>
        
        <div className="p-8">
          <button 
            onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
            className="mb-4 flex w-full items-center justify-center gap-3 rounded border border-gray-300 bg-white p-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
            Sign up with Google
          </button>
          
          <div className="relative mb-6 flex items-center py-2">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 flex-shrink-0 text-sm text-gray-400">Or sign up with email</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded border border-gray-300 p-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <button
              type="submit"
              className="mt-2 rounded bg-primary px-4 py-3 font-semibold text-white transition hover:bg-primary-dark"
            >
              Sign Up
            </button>
            
            {message && (
              <p className={`mt-2 text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
                {message}
              </p>
            )}
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default Signup;
