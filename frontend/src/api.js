import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Attach token for protected routes (skip auth endpoints)
API.interceptors.request.use((config) => {
  const skipAuth =
    config.url?.endsWith("/register/") ||
    config.url?.endsWith("/login/") ||
    config.url?.endsWith("/token/") ||
    config.url?.endsWith("/token/refresh/");
  if (!skipAuth) {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const login = async (credentials) => {
  const res = await API.post("/login/", credentials);
  // We return full res.data (username, email, role, access, refresh)
  return res.data;
};

export const register = async (payload) => {
  const res = await API.post("/register/", payload);
  return res.data;
};

// PRODUCTS
export const fetchProducts = async () => {
  const res = await API.get("/products/");
  return res.data;
};

// For farmers: backend filters products by owner for authenticated farmers.
export const fetchMyProducts = async () => {
  const res = await API.get("/products/");
  return res.data;
};

export const addProduct = async (payload) => {
  // payload: { name, price, quantity, description, image_base64 }
  const res = await API.post("/products/", payload);
  return res.data;
};

export const updateProduct = async (id, payload) => {
  const res = await API.patch(`/products/${id}/`, payload);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}/`);
  return res.data;
};

// USERS (admin)
export const fetchFarmers = async () => {
  const res = await API.get("/farmers/");
  return res.data;
};

export const fetchVendors = async () => {
  const res = await API.get("/vendors/");
  return res.data;
};

// CART
export const fetchCart = async () => {
  const res = await API.get("/cart/");
  return res.data;
};

export const addToCart = async (payload) => {
  // payload: { product: id, quantity: number } or { product_id: id, quantity }
  const body = payload.product !== undefined ? payload : { product: payload.product_id || payload.product, quantity: payload.quantity || 1 };
  const res = await API.post("/cart/", body);
  return res.data;
};

export default API;