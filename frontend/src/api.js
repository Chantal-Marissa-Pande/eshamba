import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Attach token for protected routes (skip auth endpoints)
API.interceptors.request.use((config) => {
  const skipAuth = [
    "/register",
    "/login",
    "/token",
    "/token/refresh"
  ].some(path =>
    config.url?.endsWith(path)
  );

  if (!skipAuth) {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// AUTH
export const login = async (credentials) => {
  const res = await API.post("/login/", credentials);
  const u = res.data;
  localStorage.setItem("access", u.access);
  localStorage.setItem("refresh", u.refresh);
  localStorage.setItem("role", (u.role|| "").toLowerCase())
  
  return {
    username: u.username,
    email: u.email,
    role: (u.role|| "").toLowerCase(),
    access: u.access,
    refresh: u.refresh,
  };
};

export const register = async (payload) => {
  const res = await API.post("/register/", payload);
  const u = res.data.user;
  localStorage.setItem("access", u.access);
  localStorage.setItem("refresh", u.refresh);
  localStorage.setItem("role", (u.role|| "").toLowerCase())
  
  return {
    username: u.username,
    email: u.email,
    role: (u.role|| "").toLowerCase(),
    access: u.access,
    refresh: u.refresh,
  };
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
  const body = { product: payload.product_id, quantity: payload.quantity || 1 };
  const res = await API.post("/cart/", body);
  return res.data;
};

export const updateCartItem = async (id, payload) => {
  const res = await API.patch(`/cart/${id}/`, payload);
  return res.data;
};

export const deleteCartItem = async (id) => {
  const res = await API.delete(`/cart/${id}/`);
  return res.data;
};

export default API;