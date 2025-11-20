import { useEffect, useState } from "react";
import { fetchProducts, addToCart } from "../api";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        setMessage("Failed to load products.");
      });
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(query.toLowerCase())
  );

  const handleAddToCart = async (product) => {
    try {
      const item = await addToCart({ product: product.id, quantity: 1 });
      setCart((prev) => [...prev, item]);
      setMessage(`Added ${product.name}`);
    } catch (err) {
      console.error(err);
      setMessage("Add to cart failed.");
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Vendor Dashboard</h1>
      {message && <div className="mb-4 text-green-700">{message}</div>}

      <div className="mb-4 flex justify-between items-center">
        <input
          placeholder="Search produce..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-2/3"
        />
        <div>
          🛒 Cart: <strong>{cart.length}</strong> — KSh {cartTotal.toLocaleString()}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white p-3 rounded shadow">
            {p.image_base64 && (
              <img
                src={`data:image/*;base64,${p.image_base64}`}
                alt={p.name}
                className="w-full h-36 object-cover rounded mb-2"
              />
            )}
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">KSh {p.price}</div>
            <div className="text-sm text-gray-600">Qty: {p.quantity}</div>
            <div className="mt-3">
              <button
                onClick={() => handleAddToCart(p)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}