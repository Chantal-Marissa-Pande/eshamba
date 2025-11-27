import { useEffect, useState } from "react";
import { fetchProducts, addToCart, fetchCart, updateCartItem, deleteCartItem } from "../api";
import CartView from "./CartView";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prods, cartItems] = await Promise.all([fetchProducts(), fetchCart()]);
        setProducts(prods);
        setCart(cartItems);
      } catch (err) {
        console.error(err);
        setMessage("Failed to load products or cart.");
      }
    };
    loadData();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      (p.description || "").toLowerCase().includes(query.toLowerCase())
  );

  const handleAddToCart = async (product) => {
    try {
      const item = await addToCart({ product_id: product.id, quantity: 1 });
      setCart((prev) => [...prev, item]);
      setMessage("Product added to cart.");
    } catch (err) {
      console.error(err);
      setMessage("Add to cart failed.");
    }
  };

  const handleRemoveFromCart = async (id) => {
    try {
      await deleteCartItem(id);
      setCart((prev) => prev.filter((item) => item.id !== id));
      setMessage("Item removed from cart.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to remove item.");
    }
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      const updatedItem = await updateCartItem(id, { quantity });
      setCart((prev) =>
        prev.map((item) => (item.id === id ? updatedItem : item))
      );
    } catch (err) {
      console.error(err);
      setMessage("Failed to update quantity.");
    }
  };

  const handleUpdateCart = async () => {
    try {
      await Promise.all(cart.map((item) => updateCartItem(item.id, { quantity: item.quantity })));
      setMessage("Cart updated successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update cart.");
    }
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="p-8 grid md:grid-cols-3 gap-8">
      {/* Products */}
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-4">Vendor Dashboard</h1>
        {message && <div className="mb-4 text-green-700">{message}</div>}

        <input
          placeholder="Search produce..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mb-4 w-full"
        />

        <div className="grid md:grid-cols-2 gap-4">
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
              <div className="text-sm text-gray-500 mt-2">
                <strong>Owner:</strong> {p.owner?.username || ""} <br />
                <strong>Email:</strong> {p.owner?.email || ""}
              </div>
              <button
                onClick={() => handleAddToCart(p)}
                className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div>
        <CartView
          cartItems={cart}
          onRemove={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
          onUpdateCart={handleUpdateCart}
        />
        <div className="mt-4 font-bold text-lg">
          Total: KSh {cartTotal.toLocaleString()}
        </div>
      </div>
    </div>
  );
}