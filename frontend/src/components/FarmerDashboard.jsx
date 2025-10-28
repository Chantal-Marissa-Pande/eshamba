import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Package,
  Sprout,
  ShoppingCart,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./ui/tabs";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/api/products/", newProduct);
      setNewProduct({ name: "", price: "", quantity: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center gap-2">
          <CardTitle className="text-2xl font-semibold text-green-700 flex items-center gap-2">
            <Sprout className="w-6 h-6 text-green-600" /> Farmer Dashboard
          </CardTitle>
          <CardDescription className="text-gray-500 text-center">
            Manage your farm products and monitor sales easily
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="products" className="w-full mt-4">
            <TabsList className="flex justify-center mb-4">
              <TabsTrigger value="products">My Products</TabsTrigger>
              <TabsTrigger value="add">Add Product</TabsTrigger>
            </TabsList>

            {/* Product List Tab */}
            <TabsContent value="products">
              {loading ? (
                <p className="text-center text-gray-500">Loading products...</p>
              ) : products.length === 0 ? (
                <p className="text-center text-gray-400">No products added yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="border border-green-100 hover:shadow-md transition"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-700">
                          <Package className="w-5 h-5 text-green-600" /> {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">Price: Ksh {product.price}</p>
                        <p className="text-gray-600">Quantity: {product.quantity}</p>
                        <div className="mt-2">
                          <Button variant="outline" className="w-full flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" /> View Sales
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Add Product Tab */}
            <TabsContent value="add">
              <form
                onSubmit={handleAddProduct}
                className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-4 space-y-4"
              >
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Product Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Organic Tomatoes"
                    className="border-green-200 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Price (Ksh)
                  </label>
                  <Input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 150"
                    className="border-green-200 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Quantity
                  </label>
                  <Input
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 50"
                    className="border-green-200 focus:ring-green-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default FarmerDashboard;