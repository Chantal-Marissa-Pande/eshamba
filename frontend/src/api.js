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
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------
// Auth APIs
// -----------------------------
export const login = async (credentials) => {
  try {
    const res = await API.post("/login/", credentials);
    return {
      user: {
        username: res.data.username,
        email: res.data.email,
        role: res.data.role,
      },
      access: res.data.access,
      refresh: res.data.refresh,
    };
  } catch (error) {
    console.error("❌ Login API error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const register = async (userData) => {
  try {
    const res = await API.post("/register/", userData);
    return {
      user: {
        username: res.data.user.username,
        email: res.data.user.email,
        role: res.data.user.role,
      },
      access: res.data.user.access,
      refresh: res.data.user.refresh,
    };
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