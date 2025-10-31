import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  // ✅ Make handleSubmit async to use await
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert("Please fill in all fields!");
      return;
    }

    // ✅ Prepare form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:8000/api/products/", {
        method: "POST",
        body: formData, // No need for Content-Type when using FormData
      });

      if (!response.ok) throw new Error("Failed to add product");

      const savedProduct = await response.json();

      // ✅ Notify parent and reset form
      onAddProduct(savedProduct);
      setName("");
      setPrice("");
      setImage(null);
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
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

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-600"
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