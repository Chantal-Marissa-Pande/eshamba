import React, { useState, useEffect } from "react";
import axios from "axios";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePurchase = (productName) => {
    setMessage(`🛒 You purchased ${productName}!`);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700">🏪 Vendor Dashboard</h1>
      <p className="mb-4">Welcome! Here you can browse and purchase products from farmers.</p>

      {message && <p className="text-green-700 mb-4">{message}</p>}

      <h2 className="text-xl font-semibold mb-3">Available Products</h2>
      {products.length === 0 ? (
        <p>No products available right now.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.price}</td>
                <td className="border p-2">{p.quantity}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handlePurchase(p.name)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Buy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VendorDashboard;