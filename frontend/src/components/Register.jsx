import { motion } from "framer-motion";
import { UserPlus, Leaf, Store, Shield, Eye, EyeOff } from "lucide-react";
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
      const data = await register({ username, email, password, role });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh || "");
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("role", data.user.role);

      setUser(data.user.username);
      setMessage("🎉 Registration successful!");

      // ✅ Role-based redirect
      if (role === "farmer") navigate("/farmer-dashboard");
      else if (role === "vendor") navigate("/vendor-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
      else navigate("/dashboard");
    } catch (error) {
      console.error("❌ Registration failed:", error);
      setMessage("❌ Registration failed. Check email/username.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-300 via-green-500 to-green-700 text-white px-4">
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <UserPlus className="w-12 h-12 mx-auto text-lime-200 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Create Your Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="text"
            placeholder="Full Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="text-black rounded-lg py-4 px-3"
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black rounded-lg py-4 px-3"
          />

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black rounded-lg py-4 px-3 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="flex justify-between mt-4 gap-2">
            {[
              { key: "farmer", icon: <Leaf />, label: "Farmer" },
              { key: "vendor", icon: <Store />, label: "Vendor" },
              { key: "admin", icon: <Shield />, label: "Admin" },
            ].map(({ key, icon, label }) => (
              <Button
                key={key}
                type="button"
                onClick={() => setRole(key)}
                className={`flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 ${
                  role === key
                    ? "bg-green-600 text-white"
                    : "bg-white/20 text-white border border-white/30"
                }`}
              >
                {icon} {label}
              </Button>
            ))}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl mt-6 ${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Registering..."
              : `Register as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </Button>
        </form>

        <p className="mt-6 text-sm text-white/80">
          Already have an account?{" "}
          <a href="/login" className="text-lime-200 font-semibold hover:underline">
            Login here
          </a>
        </p>
      </motion.div>
    </div>
  );
}