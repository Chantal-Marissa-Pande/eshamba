import React, { useState, useEffect } from "react";
import { ShoppingCart, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Fetch all products from farmers
  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setMessage(`🛒 Updated quantity for ${product.name}`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      setMessage(`✅ Added ${product.name} to cart`);
    }
  };

  // ✅ Remove from cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    setMessage("❌ Item removed from cart");
  };

  // ✅ Calculate total cost
  const totalCost = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-green-800 flex items-center gap-2 mb-6">
        <Package className="text-green-600 w-7 h-7" /> Vendor Dashboard
      </h2>

      {message && (
        <p className="text-center text-green-700 font-medium mb-4">{message}</p>
      )}

      {/* ✅ Product List */}
      <div>
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          Available Products
        </h3>
        {products.length === 0 ? (
          <p className="text-gray-500 italic text-center">No products available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition border-green-100"
              >
                <CardHeader>
                  <CardTitle className="text-green-700">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md border"
                    />
                  )}
                  <p className="text-gray-600 font-medium">
                    💰 KSh {product.price}
                  </p>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700 w-full"
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Cart Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
          <ShoppingCart className="text-green-600" /> My Cart
        </h3>

        {cart.length === 0 ? (
          <p className="text-gray-500 italic text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card
                key={item.id}
                className="flex justify-between items-center p-4 border-green-100"
              >
                <div>
                  <p className="font-semibold text-green-700">{item.name}</p>
                  <p className="text-gray-600 text-sm">
                    {item.quantity} × KSh {item.price}
                  </p>
                </div>
                <Button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Remove
                </Button>
              </Card>
            ))}

            {/* ✅ Total */}
            <div className="mt-6 text-right text-lg font-semibold text-green-800">
              Total Cost: KSh {totalCost.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorDashboard;