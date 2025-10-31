import React, { useState, useEffect } from "react";
import { Package, PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch products belonging to the logged-in farmer
  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      alert("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/products/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add product");

      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      setMessage("✅ Product added successfully!");
      setName("");
      setPrice("");
      setImage(null);
    } catch (error) {
      setMessage("❌ Error adding product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calculate total value
  const totalValue = products.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-green-800 flex items-center gap-2 mb-6">
        <Package className="text-green-600 w-7 h-7" /> Farmer Dashboard
      </h2>

      {/* Add Product Form */}
      <Card className="mb-8 shadow-md border-green-100">
        <CardHeader>
          <CardTitle className="text-green-700 flex items-center gap-2 text-xl">
            <PlusCircle className="w-5 h-5 text-green-600" /> Add New Produce
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProduct} className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Produce Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter produce name"
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
                Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="col-span-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
              >
                {loading ? "Adding..." : "Add Produce"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Display Message */}
      {message && (
        <p className="text-center text-green-700 font-semibold mb-4">
          {message}
        </p>
      )}

      {/* Product List */}
      <div>
        <h3 className="text-xl font-semibold text-green-800 mb-4">
          My Produce
        </h3>
        {products.length === 0 ? (
          <p className="text-gray-500 italic text-center">No produce found.</p>
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Total Value */}
      {products.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-md shadow-md text-lg font-semibold text-green-800 flex justify-between">
          <span>Total Value of Produce:</span>
          <span>KSh {totalValue.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

export default FarmerDashboard;