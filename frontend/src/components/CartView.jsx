import { motion, AnimatePresence } from "framer-motion";

export default function CartView({ cartItems }) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-8 shadow-lg border border-green-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-bold text-green-800 mb-6">🛒 Your Cart</h2>

      <AnimatePresence>
        {cartItems.length === 0 ? (
          <p className="text-gray-600 italic">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <motion.li
                key={index}
                className="bg-green-50 p-4 rounded-2xl flex justify-between items-center shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div>
                  <p className="font-semibold text-green-800">{item.name}</p>
                  <p className="text-gray-600">KSh {item.price}</p>
                </div>
                <p className="font-bold text-green-700">×1</p>
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
}