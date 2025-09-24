import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Auth APIs ---
export const register = (formData) =>
  API.post("register/", formData).then((res) => res.data);

export const login = (formData) =>
  API.post("login/", formData).then((res) => res.data);

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    const res = await API.post("token/refresh/", { refresh });
    localStorage.setItem("access", res.data.access);
    return res.data;
  }
  return null;
};

// --- Product APIs ---
export const getProducts = () => API.get("products/");
export const createProduct = (data) => API.post("products/", data);
export const updateProduct = (id, data) => API.put(`products/${id}/`, data);
export const deleteProduct = (id) => API.delete(`products/${id}/`);
