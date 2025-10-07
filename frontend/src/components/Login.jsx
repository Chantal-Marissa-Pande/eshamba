import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
import { LogIn } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-600 to-green-800 relative overflow-hidden font-sans">
      {/* Blurred Circles */}
      <div className="absolute w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      {/* Glass Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-96 text-white border border-white/20"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2">
          <LogIn /> Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 hover:shadow-blue-500/40 transition-all"
        >
          <LogIn size={18} /> Login
        </button>
      </form>
    </div>
  );
}