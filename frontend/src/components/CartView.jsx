import { motion, AnimatePresence } from "framer-motion";

export default function CartView({ cartItems, onQuantityChange, onRemove, onUpdateCart }) {
  return (
    <motion.div
      className="bg-white rounded-3xl p-6 shadow-lg border border-green-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-bold text-green-800 mb-4">🛒 Your Cart</h2>

      <AnimatePresence>
        {cartItems.length === 0 ? (
          <p className="text-gray-600 italic">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => {
                const product = item.product;
                return (
                  <motion.li
                    key={item.id}
                    className="bg-green-50 p-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-start gap-4 w-full">
                      {product.image_base64 && (
                        <img
                          src={`data:image/*;base64,${product.image_base64}`}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-green-800">{product.name}</p>
                        <p className="text-gray-600">
                          Price: KSh {product.price} <br />
                          Owner: {product.owner?.username || ""} <br />
                          Email: {product.owner?.email || ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => onQuantityChange(item.id, Number(e.target.value))}
                        className="w-16 border rounded px-1 text-sm"
                      />
                      <p className="font-bold text-green-700">
                        KSh {(product.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={onUpdateCart}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Update Cart
              </button>
            </div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}