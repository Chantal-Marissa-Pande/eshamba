import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <header className="flex justify-between items-center py-4 px-6 bg-green-700 text-white rounded-xl shadow-md">
        <h1 className="text-xl font-bold">🌱 E-Shamba</h1>
      </header>
    );
  }

  // Fetch role + emoji
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const roleEmoji =
    role === "farmer" ? "👩‍🌾" : role === "vendor" ? "🛒" : "👤";

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-green-700 text-white rounded-xl shadow-md">
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer hover:opacity-90"
      >
        🌱 E-Shamba
      </h1>

      <div className="flex items-center gap-4">
        <span className="font-medium">
          {roleEmoji} {user} ({role})
        </span>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg shadow-md"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;