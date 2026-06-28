import { useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        name,
        email,
        password,
      });
      setMessage("Signup successful! You can now sign in.");
      console.log("Signup response", resp.data);
    } catch (err) {
      setMessage("Signup failed.");
      console.error(err);
    }
  };

  return (
    <PageLayout variant="content">
      <h1 className="mb-4 text-3xl font-bold">Sign Up</h1>
      <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800"
        />
        <button
          type="submit"
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Sign Up
        </button>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </form>
    </PageLayout>
  );
}

export default Signup;
