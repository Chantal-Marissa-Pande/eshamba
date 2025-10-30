import React from "react";
import { Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

function ProductList({ products }) {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-green-800 flex items-center gap-2 mb-6">
        <Package className="text-green-600 w-6 h-6" /> My Products
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
              <CardContent>
                <p className="text-gray-600 font-medium">
                  💰 KSh {product.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;