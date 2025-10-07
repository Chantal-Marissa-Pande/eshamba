const [user, setUser] = useState(
  localStorage.getItem("username") || 
  sessionStorage.getItem("username") || 
  null
);

import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import FarmerDashboard from "./components/FarmerDashboard";
import VendorDashboard from "./components/VendorDashboard";
import { createProduct } from "./api";

function App() {
  const [user, setUser] = useState(localStorage.getItem("username") || null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Auto-login if user already exists in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setUser(savedUser);
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setMessage("👋 You have logged out.");
    navigate("/"); // back to landing
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 p-6 font-sans">
      <Header user={user} onLogout={handleLogout} />
      {message && (
        <p className="mt-4 text-yellow-700 font-semibold">{message}</p>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Redirect logged-in users away from login/register */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setUser={setUser} setMessage={setMessage} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Register setUser={setUser} setMessage={setMessage} />
            )
          }
        />

        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />

        {/* ✅ Protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard
                products={products}
                setProducts={setProducts}
                setMessage={setMessage}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

// Dashboard component
function Dashboard({ products, setProducts, setMessage }) {
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(newProduct);
      setProducts([...products, res.data]);
      setNewProduct({ name: "", price: "" });
      setMessage("✅ Product added successfully!");
    } catch {
      setMessage("❌ Failed to add product.");
    }
  };

  return (
    <div className="mt-6">
      <p className="text-lg">
        👋 Welcome,{" "}
        <span className="font-semibold">{localStorage.getItem("username")}</span>
        !
      </p>
      <ProductForm
        newProduct={newProduct}
        onChange={(e) =>
          setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
        }
        onAdd={handleAddProduct}
      />
      <ProductList products={products} />
    </div>
  );
}

export default App;