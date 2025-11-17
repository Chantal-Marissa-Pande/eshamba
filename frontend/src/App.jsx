import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import FarmerDashboard from "./components/FarmerDashboard";
import VendorDashboard from "./components/VendorDashboard";
import AdminDashboard from "./components/AdminDashboard";

import { fetchProducts, addProduct, fetchCart, addToCart } from "./api";

// ✅ Use environment variable for backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("username") || sessionStorage.getItem("username") || null
  );
  const [role, setRole] = useState(
    localStorage.getItem("role") || sessionStorage.getItem("role") || null
  );
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Auto-login on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("username") || sessionStorage.getItem("username");
    const savedRole = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (savedUser) {
      setUser(savedUser);
      setRole(savedRole);

      // redirect user based on role
      if (savedRole === "farmer") navigate("/farmer-dashboard");
      else if (savedRole === "vendor") navigate("/vendor-dashboard");
      else if (savedRole === "admin") navigate("/admin-dashboard");
      else navigate("/dashboard");
    }
  }, [navigate]);

  // ✅ Logout handler
  const handleLogout = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setRole(null);
    setMessage("👋 You have successfully logged out.");
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 p-4 sm:p-6 font-sans">
      <Header user={user} onLogout={handleLogout} />

      {message && (
        <p className="mt-4 text-yellow-800 font-semibold text-center animate-pulse">
          {message}
        </p>
      )}

      <div className="max-w-6xl mx-auto mt-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* 🔐 Redirect logged-in users away from login/register */}
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

          {/* ✅ Role-based dashboards */}
          <Route
            path="/farmer-dashboard"
            element={
              role === "farmer" ? (
                <FarmerDashboard
                  user={user}
                  products={products}
                  setProducts={setProducts}
                  cart={cart}
                  setCart={setCart}
                  setMessage={setMessage}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/vendor-dashboard"
            element={
              role === "vendor" ? (
                <VendorDashboard
                  user={user}
                  products={products}
                  setProducts={setProducts}
                  cart={cart}
                  setCart={setCart}
                  setMessage={setMessage}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              role === "admin" ? (
                <AdminDashboard
                  user={user}
                  products={products}
                  setProducts={setProducts}
                  cart={cart}
                  setCart={setCart}
                  setMessage={setMessage}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* ✅ Protected general dashboard */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard
                  user={user}
                  products={products}
                  setProducts={setProducts}
                  cart={cart}
                  setCart={setCart}
                  setMessage={setMessage}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* 🚫 Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

// ✅ Dashboard Component (Products + Cart)
function Dashboard({ user, products, setProducts, cart, setCart, setMessage }) {
  // Fetch products
  const fetchAllProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setMessage("⚠️ Unable to load products. Please try again later.");
    }
  }, [setProducts, setMessage]);

  // Fetch cart
  const fetchUserCart = useCallback(async () => {
    try {
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      setMessage("⚠️ Unable to load cart. Please try again later.");
    }
  }, [setCart, setMessage]);

  useEffect(() => {
    fetchAllProducts();
    fetchUserCart();
  }, [fetchAllProducts, fetchUserCart]);

  // Add product (for farmer)
  const handleAddProduct = async (newProduct) => {
    try {
      const savedProduct = await addProduct(newProduct);
      setProducts((prev) => [...prev, savedProduct]);
      setMessage("✅ Product added successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add product.");
    }
  };

  // Add item to cart
  const handleAddToCart = async (productId) => {
    try {
      const item = await addToCart({ product: productId, quantity: 1 });
      setCart((prev) => [...prev, item]);
      setMessage("🛒 Added to cart!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to add to cart.");
    }
  };

  // Calculate total product value
  const totalCost = products.reduce((acc, p) => acc + Number(p.price || 0), 0);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
        👋 Welcome, {user}!
      </h2>

      {/* Add Product Form (if farmer) */}
      <ProductForm onAddProduct={handleAddProduct} />

      {/* Product List */}
      <ProductList products={products} onAddToCart={handleAddToCart} />

      {/* Cart Summary */}
      <div className="mt-8 text-lg font-semibold text-center text-green-700 border-t pt-4">
        🛒 Cart Items: {cart.length} | Total Value: KSh{" "}
        {cart.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0).toLocaleString()}
      </div>

      {/* Product Summary */}
      <div className="mt-4 text-xl font-semibold text-center text-green-700 border-t pt-4">
        💰 Total Value of Products:{" "}
        <span className="text-green-800">KSh {totalCost.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default App;