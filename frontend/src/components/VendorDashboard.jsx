import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import ProductSection from "@/components/ProductSection";
import CartView from "@/components/CartView";

export default function VendorDashboard() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
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
          <ShoppingBag className="w-8 h-8 text-green-600" />
          Vendor Dashboard
        </motion.h1>

        <ProductSection onAddToCart={handleAddToCart} />

        <motion.div
          className="mt-10"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CartView cartItems={cartItems} />
        </motion.div>
      </motion.div>
    </div>
  );
}