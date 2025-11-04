import { motion } from "framer-motion";
import { Leaf, LogIn, UserPlus } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden">

      {/* Background image with overlay gradient */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598277445641-9cb79fbae4f0?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-800/80 via-emerald-700/80 to-green-900/80 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Top title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold flex items-center mb-8 mt-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Leaf className="w-8 h-8 mr-2 text-lime-300" />
          Welcome to the E-Shamba website
        </motion.h1>

        {/* Main hero card */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-2xl text-center border border-white/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            Empowering Farmers, <br /> Connecting Markets
          </h2>

          <p className="text-lg text-white/90 mb-10 max-w-xl mx-auto">
            E-Shamba bridges the gap between <span className="font-semibold text-lime-200">farmers</span> and <span className="font-semibold text-lime-200">vendors</span> — reducing food waste and empowering local agriculture.
          </p>

          {/* Buttons container */}
          <div className="flex justify-center space-x-6">
            <motion.a
              href="/login"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg space-x-2 transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </motion.a>

            <br/><br/>

            <motion.a
              href="/register"
              className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg space-x-2 transition-all duration-200 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="w-5 h-5" />
              <span>Register</span>
            </motion.a>
          </div>
        </motion.div>

        <br/><br/>

        {/* Footer */}
        <motion.footer
          className="mt-12 text-sm text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          © 2025 <span className="font-semibold text-white">E-Shamba Kenya</span>. All rights reserved.
        </motion.footer>
      </div>
    </div>
  );
}