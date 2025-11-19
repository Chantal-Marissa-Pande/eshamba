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
  const res = await API.get("/products/");
  return res.data;
};

// Add product
export const addProduct = async (formData) => {
  const res = await API.post("/products/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Update product: only send image if provided
export const updateProduct = async (id, formData) => {
  const headers = formData instanceof FormData
    ? { "Content-Type": "multipart/form-data" }
    : { "Content-Type": "application/json" };
  const res = await API.patch(`/products/${id}/`, formData, { headers });
  return res.data;
};

// Delete product
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

// ----------------- Cart -----------------
export const fetchCart = async () => {
  const res = await API.get("/cart/");
  return res.data;
};

export const addToCart = async (payload) => {
  const res = await API.post("/cart/", payload);
  return res.data;
};

export default API;