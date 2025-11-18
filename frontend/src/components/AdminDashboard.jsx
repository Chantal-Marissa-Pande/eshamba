import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchFarmers, fetchVendors, fetchAllProducts } from "../api";

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFarmers().then(setFarmers);
    fetchVendors().then(setVendors);
    fetchAllProducts().then(setProducts);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🛠️ Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card>
          <CardHeader><CardTitle>Farmers</CardTitle></CardHeader>
          <CardContent><p className="text-3xl">{farmers.length}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Vendors</CardTitle></CardHeader>
          <CardContent><p className="text-3xl">{vendors.length}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Products</CardTitle></CardHeader>
          <CardContent><p className="text-3xl">{products.length}</p></CardContent>
        </Card>
      </div>

      {/* Farmers */}
      <h2 className="text-xl font-semibold mb-3">Farmers</h2>
      <Card className="mb-8">
        <CardContent className="p-4">
          {farmers.length === 0 && <p>No farmers found.</p>}
          {farmers.map((f, i) => (
            <p key={i}>👨‍🌾 {f.username}</p>
          ))}
        </CardContent>
      </Card>

      {/* Vendors */}
      <h2 className="text-xl font-semibold mb-3">Vendors</h2>
      <Card className="mb-8">
        <CardContent className="p-4">
          {vendors.length === 0 && <p>No vendors found.</p>}
          {vendors.map((v, i) => (
            <p key={i}>🏪 {v.username}</p>
          ))}
        </CardContent>
      </Card>

      {/* Products */}
      <h2 className="text-xl font-semibold mb-3">Products</h2>
      <Card>
        <CardContent className="p-4">
          {products.map((p, i) => (
            <p key={i}>🧺 {p.name} — KSh {p.price}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}