import React, { useEffect, useState } from "react";
import axios from "axios";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("access");

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">🏪 Vendor Dashboard</h1>
      <p className="mb-6 text-gray-700">Browse and purchase farm products from trusted farmers.</p>

      {products.length === 0 ? (
        <p className="text-gray-600">No products available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">💰 KES {product.price}</p>
              <p className="text-gray-500">📦 {product.quantity} units</p>
              <p className="text-sm text-gray-400 mt-1">👩‍🌾 {product.owner.username}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;