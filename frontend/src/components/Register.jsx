import { motion } from "framer-motion";
import { UserPlus, Leaf, Store, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("farmer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    // Simple mock — replace with actual API call
    console.log("Registered:", { name, email, password, role });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 text-white relative overflow-hidden">
      {/* Glass Form Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-[90%] max-w-md border border-white/20 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <UserPlus className="w-10 h-10 mx-auto text-lime-200 mb-4" />
        <h2 className="text-3xl font-bold mb-6">Create Your Account</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            className="text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br/>
          <br/>

          <Input
            type="email"
            placeholder="Email Address"
            className="text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br/>

          {/* Password Field with Eye Toggle */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="text-black pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            :
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1 -translate-y-1 text-gray-600 hover:text-gray-800 transition"
            >
              {showPassword ? (
                <EyeOff className="w-2 h-2" />
              ) : (
                <Eye className="w-2 h-2" />
              )}
            </button>

            <br/>
            <br/>
          </div>

          {/* Role Selection */}
          <div className="flex justify-between mt-4">
            <Button
              variant={role === "farmer" ? "default" : "outline"}
              onClick={() => setRole("farmer")}
              className={`w-[48%] py-3 rounded-2xl flex items-center justify-center gap-2 ${
                role === "farmer"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
              }`}
            >
              <Leaf className="w-4 h-4" />
              Farmer
            </Button>
            <br/>
            <br/>

            <Button
              variant={role === "vendor" ? "default" : "outline"}
              onClick={() => setRole("vendor")}
              className={`w-[48%] py-3 rounded-2xl flex items-center justify-center gap-2 ${
                role === "vendor"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
              }`}
            >
              <Store className="w-4 h-4" />
              Vendor
            </Button>
            <br/>
            <br/>
          </div>

          {/* Register Button */}
          <Button
            onClick={handleRegister}
            className="bg-green-600 hover:bg-green-700 w-full py-3 rounded-2xl mt-6"
          >
            Register as {role.charAt(0).toUpperCase() + role.slice(1)}
          </Button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-sm text-white/80">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-lime-200 font-semibold hover:underline"
          >
            Login here
          </a>
        </p>
      </motion.div>

      {/* Footer */}
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