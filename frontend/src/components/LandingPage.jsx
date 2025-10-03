import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-400 to-green-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <main
        className="flex-grow flex flex-col items-center justify-center text-center px-6 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
            Welcome to E-Shamba Kenya!
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto drop-shadow-md">
            Connecting Kenyan Farmers with Certified Vendors. <br />
            E-Shamba bridges the gap between farmers and reliable markets,
            reducing food waste and increasing income through direct digital
            connections.
          </p>

          {/* Auth Buttons */}
          <div className="flex space-x-6 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Register
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-4">
        <p>&copy; 2025 E-Shamba Kenya. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;