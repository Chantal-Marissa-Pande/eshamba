import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Leaf } from "lucide-react";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access"); // JWT access token

  // ✅ Fetch all products for this farmer
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  // ✅ Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/products/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Product added successfully!");
      setForm({ name: "", price: "", quantity: "" });
      fetchProducts();
    } catch (error) {
      console.error("❌ Error adding product:", error);
      setMessage("❌ Failed to add product.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-800 flex items-center gap-2">
          <Leaf className="text-green-600" /> Farmer Dashboard
        </h1>
        <p className="text-gray-600 italic">Manage your crops and products</p>
      </header>

      {/* Product Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-green-100">
        <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
          <PlusCircle className="text-green-600" /> Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="number"
            placeholder="Price (KSh)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Product List */}
      <section>
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          🌾 Your Products
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-600 italic">No products yet. Add one above!</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-green-100 rounded-2xl shadow hover:shadow-lg transition-all p-5"
              >
                <h3 className="text-lg font-semibold text-green-700">
                  {product.name}
                </h3>
                <p className="text-gray-600">💰 KES {product.price}</p>
                <p className="text-gray-500">📦 {product.quantity} units</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default FarmerDashboard;