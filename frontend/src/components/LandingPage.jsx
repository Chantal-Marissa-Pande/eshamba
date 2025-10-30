import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus, Sprout } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-400 via-green-600 to-green-800 font-sans relative overflow-hidden">
      {/* Background decor */}
      <div className="absolute w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 top-20 left-10 animate-pulse"></div>
      <div className="absolute w-[30rem] h-[30rem] bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      {/* Header */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sprout className="w-6 h-6" /> Welcome to the E-Shamba website
        </h1>

      {/* Hero */}
      <main className="relative z-10 flex-grow flex items-center justify-center text-center px-6">
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 max-w-3xl rounded-3xl shadow-2xl text-white">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Empowering Farmers, <br /> Connecting Markets
          </h2>
          <p className="text-lg mb-10 opacity-90 leading-relaxed">
            E-Shamba bridges the gap between{" "}
            <span className="font-semibold">farmers</span> and{" "}
            <span className="font-semibold">vendors</span> — reducing food
            waste and empowering local agriculture.
          </p>

          <div className="flex justify-center item-start space-x-6 mt-6">
            <Button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
            >
              <LogIn size={20} /> Login
            </Button>
            <br />
            <br />
            <Button
              onClick={() => navigate("/register")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
            >
              <UserPlus size={20} /> Register
            </Button>
          </div>
        </Card>
      </main>

      <footer className="relative z-10 text-white text-center py-6 opacity-80">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} E-Shamba Kenya. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;