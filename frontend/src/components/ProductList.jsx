import { motion } from "framer-motion";

export default function ProductList({ products }) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-600 italic mt-8">
        No products available yet.
      </p>
    );
  }

  return (
    <motion.div
      className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {products.map((product, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-2xl hover:-translate-y-1 transition"
          whileHover={{ scale: 1.03 }}
        >
          {product.image_base64 && (
            <img
              src={`data:image/*;base64,${product.image_base64}`} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          
          <h3 className="text-xl font-bold text-green-800">{product.name}</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-green-700 font-semibold mt-3">
            KSh {product.price}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}