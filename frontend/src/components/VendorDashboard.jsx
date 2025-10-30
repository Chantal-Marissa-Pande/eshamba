import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/products/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 flex items-center gap-2">
        🏪 Vendor Dashboard
      </h1>
      <p className="mb-6 text-gray-700">
        Browse and purchase fresh farm products directly from trusted farmers.
      </p>

      {products.length === 0 ? (
        <p className="text-gray-600 italic">No products available at the moment.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-blue-700">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">💰 KES {product.price}</p>
                <p className="text-gray-500">📦 {product.quantity} units</p>
                <p className="text-sm text-gray-400 mt-1">
                  👩‍🌾 {product.owner?.username}
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700 flex items-center gap-2 w-full">
                  <ShoppingCart size={18} /> Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorDashboard;