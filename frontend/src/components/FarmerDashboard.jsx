import { useEffect, useState } from "react";
import { fetchMyProducts, addProduct, updateProduct, deleteProduct } from "../api";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity:"",
    description: "",
    image_base64: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchMyProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load your products.");
    } finally {
      setLoading(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setForm((prev) => ({
        ...prev,
        image_base64: reader.result?.split(",")[1] || reader.result,
      }));
    reader.readAsDataURL(file);
  };

  const resetForm = () =>
    setForm({ name: "", price: "", quantity: 0, description: "", image_base64: "" });

  const saveProduct = async () => {
    try {
      const payload = { ...form, price: Number(form.price || 0), quantity: Number(form.quantity) };
      if (editingId) {
        const updated = await updateProduct(editingId, payload);
        setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
        setMessage("Product updated.");
      } else {
        const created = await addProduct(payload);
        setProducts((prev) => [created, ...prev]);
        setMessage("Product added.");
      }
      resetForm();
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setMessage("Save failed.");
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name || "",
      price: p.price ?? "",
      quantity: p.quantity ?? 0,
      description: p.description || "",
      image_base64: p.image_base64 || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeProduct = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage("Product deleted.");
    } catch (err) {
      console.error(err);
      setMessage("Delete failed.");
    }
  };

  const totalValue = products.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 0), 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Farmer Dashboard</h1>
      {message && <div className="mb-4 text-green-700">{message}</div>}

      {/* Product Form */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">{editingId ? "Edit Product" : "Add Product"}</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleFile} className="mb-2" />
        {form.image_base64 && (
          <img
            src={`data:image/*;base64,${form.image_base64}`}
            alt="preview"
            className="w-28 h-28 object-cover mb-2"
          />
        )}
        <div className="flex gap-2">
          <button
            onClick={saveProduct}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>
          <button
            onClick={() => {
              resetForm();
              setEditingId(null);
            }}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="mb-4">Total inventory value: KSh {totalValue.toLocaleString()}</div>

      {/* Product List */}
      {loading ? (
        <div>Loading…</div>
      ) : products.length === 0 ? (
        <div>No products yet.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white p-3 rounded shadow">
              {p.image_base64 && (
                <img
                  src={`data:image/*;base64,${p.image_base64}`}
                  alt={p.name}
                  className="w-full h-36 object-cover mb-2 rounded"
                />
              )}
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">KSh {p.price}</div>
              <div className="text-sm text-gray-600">Qty: {p.quantity}</div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => startEdit(p)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}