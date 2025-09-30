import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Django backend
});

// Interceptor: attach access token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH APIs

// Register new user
export const register = async (formData) => {
  try {
    const res = await API.post("register/", formData);
    // Django serializer returns created user (username, email, etc.)
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Login user
export const login = async (formData) => {
  try {
    const res = await API.post("login/", formData);
    // Django returns: { access, refresh, username, role }
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Refresh token
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (refresh) {
    try {
      const res = await API.post("token/refresh/", { refresh });
      localStorage.setItem("access", res.data.access);
      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  }
  return null;
};

// PRODUCT APIs
export const getProducts = async () => {
  const res = await API.get("products/");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await API.post("products/", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await API.put(`products/${id}/`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`products/${id}/`);
  return res.data;
};