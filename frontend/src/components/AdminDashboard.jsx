import { useEffect, useState } from "react";
import { fetchProducts } from "../api";

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 🧠 Replace with actual API endpoints for admin
    fetchProducts().then(setProducts);
    // Example:
    // fetchFarmers().then(setFarmers);
    // fetchVendors().then(setVendors);
  }, []);

  return (
    <div className="p-8 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        🛠️ Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <section className="border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-3 text-green-600">Farmers</h2>
          {farmers.length ? (
            farmers.map((f, i) => <p key={i}>👨‍🌾 {f.username}</p>)
          ) : (
            <p>No farmers yet.</p>
          )}
        </section>

        <section className="border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-3 text-green-600">Vendors</h2>
          {vendors.length ? (
            vendors.map((v, i) => <p key={i}>🏪 {v.username}</p>)
          ) : (
            <p>No vendors yet.</p>
          )}
        </section>

        <section className="border rounded-xl p-4">
          <h2 className="text-xl font-semibold mb-3 text-green-600">Products</h2>
          {products.length ? (
            products.map((p, i) => (
              <div key={i} className="text-sm mb-2">
                🧺 {p.name} — <span className="text-gray-600">KSh {p.price}</span>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </section>
      </div>
    </div>
  );
}