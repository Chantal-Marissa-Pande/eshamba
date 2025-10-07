import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

function Register({ setMessage, setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "farmer",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await register(form);
      setMessage("✅ Registration successful! Please log in.");
      setUser(res.username);
      navigate("/login");
    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-green-600 to-green-800 relative overflow-hidden font-sans">
      {/* Background Circles */}
      <div className="absolute w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-16 left-10 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 bottom-16 right-10 animate-pulse"></div>

      {/* Glass Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-96 text-white border border-white/20 space-y-4"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center flex items-center justify-center gap-2">
          <UserPlus /> Register
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={form.password2}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
        >
          <option value="farmer" className="text-black">
            🌱 Farmer
          </option>
          <option value="vendor" className="text-black">
            🏪 Vendor
          </option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 hover:shadow-green-500/40 transition-all"
        >
          <UserPlus size={18} />
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;