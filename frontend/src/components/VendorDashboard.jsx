import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMyProducts, addProduct, updateProduct, deleteProduct, addToCart } from "../api";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  const [formProduct, setFormProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMyProducts()
      .then(setProducts)
      .catch(() => setMessage("⚠️ Failed to load products."));
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(q.toLowerCase()))
  );

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormProduct((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formProduct.name);
      formData.append("description", formProduct.description);
      formData.append("price", formProduct.price);
      formData.append("quantity", formProduct.quantity);
      if (formProduct.image) formData.append("image", formProduct.image);

      let savedProduct;
      if (isEditing) {
        savedProduct = await updateProduct(formProduct.id, formData);
        setProducts((prev) =>
          prev.map((p) => (p.id === savedProduct.id ? savedProduct : p))
        );
        setMessage(`✅ Product "${savedProduct.name}" updated.`);
      } else {
        savedProduct = await addProduct(formData);
        setProducts((prev) => [savedProduct, ...prev]);
        setMessage(`✅ Product "${savedProduct.name}" added.`);
      }

      setFormProduct({ id: null, name: "", description: "", price: "", quantity: "", image: null });
      setIsEditing(false);
    } catch {
      setMessage("⚠️ Failed to save product.");
    }
  };

  const handleEdit = (p) => {
    setFormProduct({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      quantity: p.quantity,
      image: null, // Keep old image if none uploaded
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setMessage("✅ Product deleted.");
    } catch {
      setMessage("⚠️ Failed to delete product.");
    }
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart({ product: product.id, quantity: 1 });
      setCart((prev) => [...prev, { product, quantity: 1 }]);
      setMessage(`✅ Added ${product.name} to cart.`);
    } catch {
      setMessage("⚠️ Failed to add to cart.");
    }
  };

  const totalValue = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Vendor Dashboard</h1>

      {/* Add/Edit Product Form */}
      <form onSubmit={handleFormSubmit} className="mb-6 p-4 border rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formProduct.name}
          onChange={handleFormChange}
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formProduct.description}
          onChange={handleFormChange}
          className="p-2 border rounded mb-2 w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formProduct.price}
          onChange={handleFormChange}
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formProduct.quantity}
          onChange={handleFormChange}
          className="p-2 border rounded mb-2 w-full"
          required
        />
        <input type="file" name="image" onChange={handleFormChange} className="mb-2 w-full" />
        <Button type="submit" className="bg-green-600 hover:bg-green-700 w-full">
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </form>

      <br/>
      
      {/* Search */}
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="p-2 border rounded mb-4 w-full"
      />

      {/* Cart Info */}
      <div className="text-right mb-4 text-gray-700 text-lg">
        🛒 <span className="font-bold">{cart.length}</span> items |
        <span className="font-bold text-green-700"> KSh {totalValue.toLocaleString()}</span>
      </div>

      {/* Status */}
      {message && <p className="mb-4 text-center text-green-700 font-semibold">{message}</p>}

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <Card key={p.id}>
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">{p.name}</CardTitle>
              <div className="flex gap-2">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 text-sm" onClick={() => handleEdit(p)}>
                  Edit
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-sm" onClick={() => handleDelete(p.id)}>
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {p.image && (
                <img src={`http://127.0.0.1:8000${p.image}`} className="w-32 h-32 object-cover rounded mb-3 mx-auto" alt={p.name} />
              )}
              <p className="text-green-700 font-bold mb-1">KSh {Number(p.price).toLocaleString()}</p>
              <p className="text-gray-600 text-sm mb-1">{p.description}</p>
              <p className="text-gray-600 text-sm mb-3">Qty: {p.quantity}</p>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleAddToCart(p)}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}