import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Please fill in all fields!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: parseFloat(price),
    };

    onAddProduct(newProduct);
    setName("");
    setPrice("");
  };

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-green-700 flex items-center gap-2 text-xl">
          <Plus className="w-5 h-5 text-green-600" /> Add New Product
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Product Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Price (KSh)
            </label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;