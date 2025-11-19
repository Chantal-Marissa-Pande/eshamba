import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import FarmerDashboard from "./components/FarmerDashboard";
import VendorDashboard from "./components/VendorDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user || !role) return;
    const routes = {
      farmer: "/farmer-dashboard",
      vendor: "/vendor-dashboard",
      admin: "/admin-dashboard",
      administrator: "/admin-dashboard",
    };
    const r = role.toLowerCase();
    navigate(routes[r] || "/");
  }, [user, role, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    setMessage("👋 You have logged out.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 p-4 sm:p-6 font-sans">
      <Header user={user} onLogout={handleLogout} />

      {message && <p className="mt-4 text-yellow-800 font-semibold text-center animate-pulse">{message}</p>}

      <div className="max-w-6xl mx-auto mt-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} setRole={setRole} setMessage={setMessage} />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register setUser={setUser} setRole={setRole} setMessage={setMessage} />} />

          <Route path="/farmer-dashboard" element={role === "farmer" ? <FarmerDashboard /> : <Navigate to="/" />} />
          <Route path="/vendor-dashboard" element={role === "vendor" ? <VendorDashboard /> : <Navigate to="/" />} />
          <Route path="/admin-dashboard" element={role === "admin" || role === "administrator" ? <AdminDashboard /> : <Navigate to="/" />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;