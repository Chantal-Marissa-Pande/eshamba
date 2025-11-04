import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";

export default function FarmerDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-green-200 text-gray-800">
      <motion.div
        className="max-w-6xl mx-auto py-10 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-green-800 flex items-center gap-3 mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Sprout className="w-8 h-8 text-green-600" />
          Farmer Dashboard
        </motion.h1>

        <motion.div
          className="bg-white rounded-3xl shadow-xl p-8 border border-green-100"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProductForm onAddProduct={handleAddProduct} />
        </motion.div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ProductList products={products} />
        </motion.div>
      </motion.div>
    </div>
  );
}