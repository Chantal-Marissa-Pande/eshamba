import React, { useState } from "react";

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Please fill in all fields!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };

    onAddProduct(newProduct);
    setName("");
    setPrice("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-semibold text-green-800 flex items-center mb-4">
        <span className="text-green-600 mr-2">➕</span> Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Price (KSh)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;