import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProducts } from "../api";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Vendor Dashboard</h1>

      {/* Cart Info */}
      <div className="text-right mb-4 text-gray-700">
        🛒 Cart Items: <span className="font-bold">{cart.length}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>KSh {p.price}</p>
              <Button
                className="mt-3 bg-green-600 hover:bg-green-700"
                onClick={() => addToCart(p)}
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