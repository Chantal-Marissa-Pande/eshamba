import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const user = localStorage.getItem("username");
    if (user){
      navigate("/dashboard");
    }else{
      navigate("/login");
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Welcome to Eshamba!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Your platform to connect farmers and vendors.
      </p>
      <button
        onClick={handleGetStarted}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;
