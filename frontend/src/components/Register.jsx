import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 text-white relative overflow-hidden">
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-[90%] max-w-md border border-white/20 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <UserPlus className="w-10 h-10 mx-auto text-lime-200 mb-4" />
        <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>

        <div className="space-y-4">
          <Input type="text" placeholder="Full Name" className="text-black" />
          <Input type="email" placeholder="Email" className="text-black" />
          <Input type="password" placeholder="Password" className="text-black" />

          <Button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 w-full py-3 rounded-2xl"
          >
            Register
          </Button>
        </div>
      </motion.div>

      <motion.footer
        className="mt-10 text-sm text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © 2025 E-Shamba Kenya
      </motion.footer>
    </div>
  );
}