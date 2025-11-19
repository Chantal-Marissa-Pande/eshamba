import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
  headers: { "Content-Type": "application/json" },
});

// Attach token for protected routes (skip on auth endpoints)
API.interceptors.request.use((config) => {
  const skipAuth =
    config.url?.endsWith("/register/") || config.url?.endsWith("/login/");
  if (!skipAuth) {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----------------- Auth -----------------
export const login = async (credentials) => {
  const res = await API.post("/login/", credentials);
  return res.data;
};

export const register = async (payload) => {
  const res = await API.post("/register/", payload);
  return res.data;
};

// ----------------- Products -----------------
export const fetchProducts = async () => {
  const res = await API.get("/products/");
  return res.data;
};

export const fetchMyProducts = async () => {
  // backend filters by role; farmers will get only their own products
  const res = await API.get("/products/");
  return res.data;
};

export const addProduct = async (payload) => {
  // payload: { name, price, description, quantity, image_base64 }
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

// ----------------- Users -----------------
export const fetchFarmers = async () => {
  const res = await API.get("/farmers/");
  return res.data;
};

export const fetchVendors = async () => {
  const res = await API.get("/vendors/");
  return res.data;
};

// ----------------- Cart (simple interfaces; adapt to your backend) -----------------
export const fetchCart = async () => {
  const res = await API.get("/cart/");
  return res.data;
};

export const addToCart = async (payload) => {
  // payload: { product: id, quantity: number } — adapt to your cart model
  const res = await API.post("/cart/", payload);
  return res.data;
};

export default API;