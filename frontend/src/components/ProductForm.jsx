import React from "react";

function ProductForm({ newProduct, onChange, onAdd }) {
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow border border-green-200">
      <h2 className="text-xl font-semibold text-green-700">➕ Add Product</h2>
      <form onSubmit={onAdd} className="flex gap-2 mt-2">
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={onChange} className="border rounded px-3 py-2 w-40" required />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={onChange} className="border rounded px-3 py-2 w-32" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
      </form>
    </div>
  );
}

export default ProductForm;
