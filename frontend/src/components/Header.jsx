import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Sprout } from "lucide-react";
import { Button } from "./ui/button";

function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || sessionStorage.getItem("role");
  const roleEmoji = role === "farmer" ? "👩‍🌾" : role === "vendor" ? "🛒" : "👤";

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-green-700 text-white rounded-xl shadow-md">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer hover:opacity-90"
      >
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="font-medium">
            {roleEmoji} {user} ({role})
          </span>
          <Button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      ) : null}
    </header>
  );
}

export default Header;