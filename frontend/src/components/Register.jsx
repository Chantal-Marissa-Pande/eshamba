import { motion } from "framer-motion";
import { UserPlus, Leaf, Store, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "../api";

export default function RegisterPage({ setUser, setMessage }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("farmer");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = { username, email, password, role };
      const data = await register(formData);

      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);

      setUser(data.username);
      setMessage("🎉 Registration successful! You are now logged in.");

      navigate(
        data.role === "farmer"
          ? "/farmer-dashboard"
          : data.role === "vendor"
          ? "/vendor-dashboard"
          : "/dashboard"
      );
    } catch (error) {
      console.error("❌ Registration error:", error);
      setMessage("❌ Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-300 via-green-500 to-green-700 text-white overflow-hidden px-4">
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md border border-white/20 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <UserPlus className="w-12 h-12 mx-auto text-lime-200 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Create Your Account</h2>

        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            aria-label="Full Name"
            className="text-black rounded-lg focus:ring-2 focus:ring-lime-300 py-4 px-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br/>
          <br/>

          <Input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            className="text-black rounded-lg focus:ring-2 focus:ring-lime-300 py-4 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br/>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              aria-label="Password"
              className="text-black rounded-lg focus:ring-2 focus:ring-lime-300 pr-12 py-4 px-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            :
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <br/>
            <br/>

          </div>

          <div className="flex justify-between mt-4 gap-2">
            {["farmer", "vendor"].map((r) => (
              <Button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 transition-transform hover:scale-105 ${
                  role === r
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-white/20 text-white border border-white/30 hover:bg-white/30"
                }`}
              >
                {r === "farmer" ? <Leaf className="w-5 h-5" /> : <Store className="w-5 h-5" />}
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </Button>
            ))}
          </div>
          <br/>

          <Button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full py-4 rounded-2xl mt-6 transition-transform hover:scale-105 ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Registering..." : `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </Button>
        </div>
        <br/>

        <p className="mt-6 text-sm text-white/80">
          Already have an account?{" "}
          <a href="/login" className="text-lime-200 font-semibold hover:underline">
            Login here
          </a>
        </p>
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