import axios from "axios";

// -----------------------------
// Base API Configuration
// -----------------------------
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// -----------------------------
// Interceptor: attach JWT access token
// -----------------------------
API.interceptors.request.use((config) => {
  if (config.url.endsWith("/register/") || config.url.endsWith("/login/")) {
    return config; // don't attach token
  }
  const token = localStorage.getItem("access");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -----------------------------
// Role-based redirection helper
// -----------------------------
export const redirectByRole = (role) => {
  const paths = {
    administrator: "/admin-dashboard",
    farmer: "/farmer-dashboard",
    vendor: "/vendor-dashboard",
  };
  window.location.href = paths[role] || "/dashboard";
};

// -----------------------------
// Auth APIs
// -----------------------------
export const login = async (credentials) => {
  try {
    const res = await API.post("/login/", credentials);

    const { username, email, role, access, refresh } = res.data;

    // Store tokens and user info
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    redirectByRole(role);

    return { user: { username, email, role }, access, refresh };
  } catch (error) {
    console.error("❌ Login API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const register = async (userData) => {
  try {
    const res = await API.post("/register/", userData);

    const { username, email, role, access, refresh } = res.data.user;

    // Store tokens and user info
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    redirectByRole(role);

    return { user: { username, email, role }, access, refresh };
  } catch (error) {
    console.error("❌ Register API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// -----------------------------
// Product APIs
// -----------------------------
export const fetchProducts = async () => {
  try {
    const res = await API.get("/products/");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch products API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const addProduct = async (productData) => {
  try {
    const res = await API.post("/products/", productData);
    return res.data;
  } catch (error) {
    console.error("❌ Add product API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// -----------------------------
// Cart APIs
// -----------------------------
export const fetchCart = async () => {
  try {
    const res = await API.get("/cart/");
    return res.data;
  } catch (error) {
    console.error("❌ Fetch cart API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const addToCart = async (cartItem) => {
  try {
    const res = await API.post("/cart/", cartItem);
    return res.data;
  } catch (error) {
    console.error("❌ Add to cart API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};