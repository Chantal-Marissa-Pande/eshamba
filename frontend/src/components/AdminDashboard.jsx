import { useEffect, useState } from "react";
import { fetchFarmers, fetchVendors, fetchProducts, deleteProduct } from "../api";

export default function AdminDashboard() {
  const [farmers, setFarmers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [f, v, p] = await Promise.all([fetchFarmers(), fetchVendors(), fetchProducts()]);
        setFarmers(f);
        setVendors(v);
        setProducts(p);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load admin data.");
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((x) => x.id !== id));
      setMessage("Product deleted.");
    } catch (err) {
      console.error(err);
      setMessage("Delete failed.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      {message && <div className="mb-4 text-red-600">{message}</div>}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Farmers</div>
          <div className="text-2xl font-bold">{farmers.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Vendors</div>
          <div className="text-2xl font-bold">{vendors.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-600">Products</div>
          <div className="text-2xl font-bold">{products.length}</div>
        </div>
      </div>

      <h2 className="text-xl mb-3">Products</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-600">Owner: {p.owner}</div>
                <div className="text-sm text-gray-600">KSh {p.price}</div>
              </div>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
            {p.image_base64 && (
              <img
                src={`data:image/*;base64,${p.image_base64}`}
                alt={p.name}
                className="w-full h-36 object-cover mt-3 rounded"
              />
            )}
            {p.description && <p className="text-sm text-gray-600 mt-2">{p.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}