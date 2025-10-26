import React, { useEffect, useState } from "react";
import axios from "axios";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("access"); // assuming JWT is stored here

  // Fetch products belonging to this farmer
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/products/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Product added successfully!");
      setForm({ name: "", price: "", quantity: "" });
      fetchProducts();
    } catch (error) {
      setMessage("❌ Failed to add product.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🌱 Farmer Dashboard</h1>
      <p className="mb-6 text-gray-700">Manage your crops and farm products.</p>

      {/* Add Product Form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Add
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>

      {/* Product List */}
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products yet. Add one above!</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">💰 KES {product.price}</p>
              <p className="text-gray-500">📦 {product.quantity} units</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FarmerDashboard;