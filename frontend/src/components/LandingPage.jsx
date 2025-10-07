import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react"; // Icons

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-green-400 via-green-600 to-green-800 relative overflow-hidden">
      {/* Decorative Background Circles */}
      <div className="absolute w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse top-20 left-10"></div>
      <div className="absolute w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse bottom-10 right-10"></div>

      {/* Header */}
      <header 
      className="relative z-10 py-6 px-10 flex justify-between items-center">
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-grow flex items-center justify-center text-center px-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-3xl text-white border border-white/20">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Empowering Farmers, <br /> Connecting Markets
          </h2>
          <p className="text-lg mb-12 leading-relaxed opacity-90">
            E-Shamba bridges the gap between{" "}
            <span className="font-semibold">farmers</span> and{" "}
            <span className="font-semibold">certified vendors</span>. Together
            we reduce food waste, increase income, and build stronger digital
            communities.
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 hover:shadow-blue-500/40 transition-all"
            >
              <LogIn size={20} /> Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 hover:shadow-green-500/40 transition-all"
            >
              <UserPlus size={20} /> Register
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-white text-center py-6 opacity-80">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} E-Shamba Kenya. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;