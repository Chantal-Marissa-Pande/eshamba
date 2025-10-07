import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerAPI, login as loginAPI } from "../api";

function Register({ setUser, setMessage }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "farmer", // default selection
  });
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Register user with role
      await registerAPI(formData);

      // ✅ Immediately log them in
      const res = await loginAPI({
        username: formData.username,
        password: formData.password,
      });

      // Save token + username + role
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem("access", res.access);
      storage.setItem("refresh", res.refresh);
      storage.setItem("username", res.username);
      if (res.role) storage.setItem("role", res.role);

      setUser(res.username);

      // Map role to emoji
      const roleEmoji = res.role === "farmer" ? "👩‍🌾" : res.role === "vendor" ? "🛒" : "👤";
      setMessage(`✅ Registered as ${roleEmoji} ${formData.username} (${formData.role})`);

      // Redirect based on role
      if (res.role === "farmer") {
        navigate("/farmer-dashboard");
      } else if (res.role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage("❌ Registration failed: " + JSON.stringify(err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>

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

      {/* Role selector with emojis */}
      <div className="mb-4">
        <span className="block text-sm font-medium mb-2">I am a:</span>
        <div className="flex gap-4">
          {/* Farmer Option */}
          <label className="cursor-pointer flex-1">
            <input
              type="radio"
              name="role"
              value="farmer"
              checked={formData.role === "farmer"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`p-4 border rounded-lg flex flex-col items-center transition ${
                formData.role === "farmer"
                  ? "border-green-600 bg-green-50 shadow-md"
                  : "border-gray-300"
              }`}
            >
              <span className="text-4xl mb-2">👩‍🌾</span>
              <span className="font-semibold">Farmer</span>
            </div>
          </label>

          {/* Vendor Option */}
          <label className="cursor-pointer flex-1">
            <input
              type="radio"
              name="role"
              value="vendor"
              checked={formData.role === "vendor"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`p-4 border rounded-lg flex flex-col items-center transition ${
                formData.role === "vendor"
                  ? "border-green-600 bg-green-50 shadow-md"
                  : "border-gray-300"
              }`}
            >
              <span className="text-4xl mb-2">🛒</span>
              <span className="font-semibold">Vendor</span>
            </div>
          </label>
        </div>
      </div>

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
        Register
      </button>
    </form>
  );
}

export default Register;