import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

function ProductsSection() {
  const [products, setProducts] = useState([]);

  // Fetch products when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/") // your Django endpoint
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Add product and send to backend
  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post("http://localhost:8000/api/products/", newProduct);
      setProducts((prev) => [...prev, response.data]); // update local list
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-6">
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList products={products} />
    </div>
  );
}

export default ProductsSection;