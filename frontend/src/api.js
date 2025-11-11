import axios from "axios";

// -----------------------------
// Base API Configuration
// -----------------------------
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -----------------------------
// AUTH APIs
// -----------------------------

// ✅ Register new user
export const register = async (formData) => {
  try {
    const res = await API.post("register/", formData, {
      headers: { "Content-Type": "application/json" },
    });

    // Backend should return user + tokens
    const { access, refresh, user } = res.data;

    // Save everything properly
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    return { access, refresh, user };
  } catch (err) {
    console.error("❌ Registration failed:", err.response?.data || err);
    throw err.response?.data || err;
  }
};

// ✅ Login
export const login = async (formData) => {
  try {
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const res = await API.post("login/", payload, {
      headers: { "Content-Type": "application/json" },
    });

    const { access, refresh, user } = res.data;

    // Save tokens and user
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    return { access, refresh, user };
  } catch (err) {
    console.error("❌ Login failed:", err.response?.data || err);
    throw err.response?.data || err;
  }
};

// ✅ Refresh token
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const res = await API.post("token/refresh/", { refresh });
    localStorage.setItem("access", res.data.access);
    return res.data;
  } catch (err) {
    console.error("❌ Token refresh failed:", err);
    throw err.response?.data || err;
  }
};

// ✅ Logout
export const logout = () => {
  localStorage.clear();
};

// -----------------------------
// PRODUCT APIs
// -----------------------------

// ✅ Get all products
export const getProducts = async () => {
  const res = await API.get("products/");
  return res.data;
};

// ✅ Create product (with image upload)
export const createProduct = async (data) => {
  try {
    const form = new FormData();
    form.append("name", data.name);
    form.append("description", data.description);
    form.append("price", data.price);
    if (data.image) form.append("image", data.image);

    const res = await API.post("products/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    console.error("❌ Product creation failed:", err.response?.data || err);
    throw err.response?.data || err;
  }
};

// ✅ Update product
export const updateProduct = async (id, data) => {
  const res = await API.put(`products/${id}/`, data);
  return res.data;
};

// ✅ Delete product
export const deleteProduct = async (id) => {
  const res = await API.delete(`products/${id}/`);
  return res.data;
};

// -----------------------------
// CART APIs
// -----------------------------
export const addToCart = async (productId, quantity = 1) => {
  const res = await API.post("cart/", { product: productId, quantity });
  return res.data;
};

export const getCartItems = async () => {
  const res = await API.get("cart/");
  const cartItems = res.data;
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return { cartItems, total };
};