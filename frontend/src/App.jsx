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
  const [user, setUser] = useState(localStorage.getItem("username") || sessionStorage.getItem("username") || null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Auto-login if user already exists in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("username")|| sessionStorage.getItem("username");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (savedUser) {
      setUser(savedUser);
      if (role === "farmer") {
        navigate("/farmer-dashboard");
      }
      else if (role === "vendor") {
        navigate("/vendor-dashboard");
      } else
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
  // ✅ Fetch products from backend when the dashboard loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/products/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [setProducts]);

  // ✅ Add product to backend
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch("http://localhost:8000/api/products/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      setMessage("✅ Product added successfully!");
    } catch (error) {
      setMessage("❌ Failed to add product.");
    }
  };

  // ✅ Calculate total cost of all products
  const totalCost = products.reduce((acc, p) => acc + Number(p.price || 0), 0);

  return (
    <div className="mt-6">
      <p className="text-lg mb-4">
        👋 Welcome,{" "}
        <span className="font-semibold">{localStorage.getItem("username")}</span>!
      </p>

      {/* Add new product form */}
      <ProductForm onAddProduct={handleAddProduct} />

      {/* Show all products */}
      <ProductList products={products} />

      {/* ✅ Total cost display */}
      <div className="mt-8 text-xl text-green-700 font-semibold text-center">
        Total Value of Products: KSh {totalCost.toLocaleString()}
      </div>
    </div>
  );
}

export default App;