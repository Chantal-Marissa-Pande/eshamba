import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../api";

function Login({ setUser, setMessage }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI(formData);

      // Save tokens + username + role
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("access", res.access);
      storage.setItem("refresh", res.refresh);
      storage.setItem("username", res.username);
      if (res.role) storage.setItem("role", res.role);

      setUser(res.username);

      // Map role to emoji
      const roleEmoji = res.role === "farmer" ? "👩‍🌾" : res.role === "vendor" ? "🛒" : "👤";
      setMessage(`✅ Logged in as ${roleEmoji} ${res.username} (${res.role})`);

      // Redirect based on role
      if (res.role === "farmer") {
        navigate("/farmer-dashboard");
      } else if (res.role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage("❌ Login failed: " + JSON.stringify(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
      />

      {/* Stay logged in */}
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={remember}
          onChange={() => setRemember(!remember)}
          className="mr-2"
        />
        Stay logged in
      </label>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Login
      </button>
    </form>
  );
}

export default Login;