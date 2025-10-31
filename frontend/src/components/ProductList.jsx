import React, { useState } from "react";
import { Package, ShoppingCart, Plus, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

function ProductList({ products }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      // increment quantity if already added
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto mt-10">
      {/* Products Section */}
      <h2 className="text-2xl font-semibold text-green-800 flex items-center gap-2 mb-6">
        <Package className="text-green-600 w-6 h-6" /> Available Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 italic text-center">No products found.</p>
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
                  onClick={() => addToCart(product)}
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Cart Section */}
      {cart.length > 0 && (
        <div className="mt-10 bg-gray-50 p-6 rounded-lg shadow-md border border-green-100">
          <h3 className="text-xl font-semibold text-green-800 flex items-center gap-2 mb-4">
            <ShoppingCart className="text-green-600 w-5 h-5" /> My Cart
          </h3>

          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × KSh {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-green-700">
                    KSh {item.price * item.quantity}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span className="text-green-700">KSh {totalCost}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;