import { useState, useEffect } from "react";
import { fetchFarmers, fetchVendors, fetchProducts } from "../api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

useEffect(() => {
    (async () => {
      try {
        const [fData, vData, pData] = await Promise.all([
          fetchFarmers(),
          fetchVendors(),
          fetchProducts(),
        ]);
        setFarmers(fData);
        setVendors(vData);
        setProducts(pData);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to load admin data");
      }
    })();
  }, []);

  const handleDeleteProduct = async (id) => {
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

return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {message && <div className="mb-4 text-sm text-red-600">{message}</div>}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{farmers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Farmers</h2>
        <div className="grid gap-2">
          {farmers.map((f) => (
            <div key={f.id} className="p-3 border rounded flex justify-between">
              <div>
                <div className="font-medium">{f.username}</div>
                <div className="text-sm text-gray-600">{f.email}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Vendors</h2>
        <div className="grid gap-2">
          {vendors.map((v) => (
            <div key={v.id} className="p-3 border rounded flex justify-between">
              <div>
                <div className="font-medium">{v.username}</div>
                <div className="text-sm text-gray-600">{v.email}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <Card key={p.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{p.name}</span>
                  <span className="text-sm text-gray-600">KSh {p.price}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {p.image_base64 && (
                  <img
                    src={p.image_base64}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <p className="text-sm text-gray-600">{p.description}</p>
                <div className="flex gap-2 mt-3">
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDeleteProduct(p.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}