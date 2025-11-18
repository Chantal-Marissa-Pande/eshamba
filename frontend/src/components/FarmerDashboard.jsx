import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMyProducts, addProduct } from "../api";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchMyProducts().then(setProducts);
  }, []);

  const handleAdd = async () => {
    const newItem = await addProduct(form);
    setProducts([...products, newItem]);
    setForm({ name: "", price: "" });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Farmer Dashboard</h1>

      {/* Add Produce */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Produce</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
            Add Product
          </Button>
        </CardContent>
      </Card>

      {/* Product List */}
      <h2 className="text-2xl font-semibold mb-3">My Produce</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <Card key={i} className="shadow">
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">KSh {p.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}