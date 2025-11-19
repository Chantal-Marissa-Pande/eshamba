import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProducts, addToCart } from "../api";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  // Fetch products
  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => {
        console.error("❌ Error fetching products:", err);
        setMessage("⚠️ Failed to load products. Please try again later.");
      });
  }, []);

  // Search filter
  const filtered = products.filter((p) => {
    const matchesQ =
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(q.toLowerCase()));
    return matchesQ;
  });

  // Handle Add to Cart
  const handleAddToCart = async (product) => {
    try {
      const item = await addToCart({ product: product.id, quantity: 1 });

      // Add to local cart display
      setCart((prev) => [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ]);

      setMessage(`✅ Added ${product.name} to cart.`);
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      setMessage("⚠️ Failed to add to cart. Please try again.");
    }
  };

  // Total Cart Value
  const totalValue = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Vendor Dashboard
      </h1>

      {/* Search bar */}
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="p-2 border rounded mb-4 w-full"
      />

      {/* Cart Info */}
      <div className="text-right mb-4 text-gray-700 text-lg">
        🛒 <span className="font-bold">{cart.length}</span> items |
        <span className="font-bold text-green-700">
          {" "}
          KSh {totalValue.toLocaleString()}
        </span>
      </div>

      {/* Status message */}
      {message && (
        <p className="mb-4 text-center text-green-700 font-semibold">
          {message}
        </p>
      )}

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{p.name}</CardTitle>
            </CardHeader>

            <CardContent>
              {p.image && (
                <img
                  src={`http://127.0.0.1:8000${p.image}`}
                  className="w-32 h-32 object-cover rounded mb-3 mx-auto"
                  alt={p.name}
                />
              )}

              <p className="text-green-700 font-bold mb-1">
                KSh {Number(p.price).toLocaleString()}
              </p>

              <p className="text-gray-600 text-sm mb-1">{p.description}</p>
              <p className="text-gray-600 text-sm mb-3">
                Qty Available: {p.quantity}
              </p>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleAddToCart(p)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}