import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  fetchMyProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: 0, image_base64: "", });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // Load farmer's own products
  // ------------------------------------
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try{
      const data = await fetchMyProducts();
      setProducts(data);
    }catch(error){
      console.error("❌ Error fetching products:", error);
      setMessage("⚠️ Failed to load your products. Please try again later.");
    }
  };

  // ------------------------------------
  // Handle image upload
  // ------------------------------------
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...f, image_base64: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({ name: "", price: "", quantity: 0, image_base64: "" });
  }

  // ------------------------------------
  // Add or Edit Product
  // ------------------------------------
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingId) {
        const updated = await updateProduct(editingId, form);
        setProducts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
        setMessage("✅ Product updated successfully.");
      } else {
        const created = await addProduct(form);
        setProducts((prev) => [...prev, created]);
        setMessage("✅ Product added successfully."); 
      }
      resetForm();
      setEditingId(null);
    } catch (error) {
      console.error("❌ Error saving product:", error);
      setMessage("⚠️ Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      image_base64: p.image_base64 || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ------------------------------------
  // Delete Product
  // ------------------------------------
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage("✅ Product deleted successfully.");
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      setMessage("⚠️ Failed to delete product. Please try again.");
    }
  };

  const totalValue = products.reduce((s, p) => s + Number(p.price || 0) * Number(p.quantity || 0), 0 );
  
return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Farmer Dashboard</h1>

      {message && <div className="mb-4 text-sm text-green-700">{msg}</div>}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Produce" : "Add Produce"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <br/>
          <br/>
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Price (KSh)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <br/>
          <br/>

          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <br/>
          <br/>
          <textarea
            className="border rounded px-3 py-2 w-full"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <br/>
          
          <input type="file" accept="image/*" onChange={handleFile} />
          {form.image_base64 && (
            <img src={form.image_base64} alt="preview" className="w-32 h-32 object-cover rounded" />
          )}

          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              {loading ? "Saving..." : editingId ? "Update" : "Add Produce"}
            </Button>
            <br/>
            <br/>
            
            <Button onClick={() => { resetForm(); setEditingId(null); }} variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <strong>Total inventory value:</strong> KSh {totalValue.toLocaleString()}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {p.image_base64 && (
                <img src={p.image_base64} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />
              )}
              <p className="text-gray-700">KSh {p.price}</p>
              <p className="text-sm text-gray-600">Qty: {p.quantity}</p>
              <p className="text-sm text-gray-600">{p.description}</p>

              <div className="flex gap-2 mt-3">
                <Button onClick={() => handleEdit(p)} className="bg-blue-600 hover:bg-blue-700">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(p.id)} className="bg-red-600 hover:bg-red-700">
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}