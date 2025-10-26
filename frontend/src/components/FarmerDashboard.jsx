import React, { useState, useEffect } from "react";
import axios from "axios";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
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

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/products/", newProduct);
      setProducts([...products, response.data]);
      setMessage("✅ Product added successfully!");
      setNewProduct({ name: "", price: "", quantity: "" });
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      setMessage("❌ Failed to add product. Please check your inputs.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700">🌱 Farmer Dashboard</h1>
      <p className="mb-4">Welcome! Here you can manage your crops and farm products.</p>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="bg-green-50 p-4 rounded shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          className="border p-2 mr-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>

      {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}

      {/* Product List */}
      <h2 className="text-xl font-semibold mb-3">Your Products</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-green-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.price}</td>
                <td className="border p-2">{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FarmerDashboard;