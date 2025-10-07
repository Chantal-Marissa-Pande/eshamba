import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setUser, setMessage }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username && formData.password) {
      // ✅ Save in chosen storage
      if (remember) {
        localStorage.setItem("username", formData.username);
      } else {
        sessionStorage.setItem("username", formData.username);
      }

      setUser(formData.username);
      setMessage("✅ Registration successful!");
      navigate("/dashboard");
    } else {
      setMessage("❌ Please fill all fields.");
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