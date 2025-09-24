import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

function Login({ setUser, setMessage }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        username: form.username,
        password: form.password,
      });

      // Save auth details
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      setUser(data.username);
      setMessage("✅ Logged in successfully!");

      // Redirect by role
      if (data.role === "farmer") navigate("/farmer-dashboard");
      else if (data.role === "vendor") navigate("/vendor-dashboard");
      else navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMessage("❌ Login failed. Check your credentials.");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <a href="/register" className="text-green-700 font-semibold">
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;
