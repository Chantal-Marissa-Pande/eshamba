import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <motion.div
      className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-white p-6 rounded-3xl shadow-lg border border-green-100 hover:shadow-2xl transition"
          whileHover={{ scale: 1.03 }}
        >
          <h3 className="text-xl font-bold text-green-800">{product.name}</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-green-700 font-semibold mt-3">KSh {product.price}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}