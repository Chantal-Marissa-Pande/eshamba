import React, { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

function Register({ setMessage, setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "farmer",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      setMessage("✅ Registration successful! Please log in.");
      setUser(res.data.user.username);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage("❌ Registration failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-green-700">Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="password"
        name="password2"
        placeholder="Confirm Password"
        value={form.password2}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      {/* Role Selection */}
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="farmer">🌱 Farmer</option>
        <option value="vendor">🏪 Vendor</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  );
}

export default Register;
