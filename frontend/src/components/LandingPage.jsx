import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold tracking-wide">🌾 E-Shamba Kenya</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main
        className="flex-grow flex flex-col items-center justify-center text-center px-6 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 text-white max-w-2xl">
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            Welcome to E-Shamba Kenya
          </h2>
          <p className="text-lg mb-8 leading-relaxed drop-shadow-md">
            Connecting Kenyan <span className="font-semibold">Farmers</span> with{" "}
            <span className="font-semibold">Certified Vendors</span>. <br />
            E-Shamba bridges the gap between farmers and reliable markets,
            reducing food waste and increasing income through direct digital
            connections.
          </p>

          {/* Auth Buttons */}
          <div className="flex space-x-6 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 transition transform hover:scale-105"
            >
              Register
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center py-4 shadow-inner">
        <p className="text-sm">&copy; {new Date().getFullYear()} E-Shamba Kenya. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;