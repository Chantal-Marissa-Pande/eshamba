import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "../api";

export default function LoginPage({ setUser, setMessage, setRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login({ email, password });

      // Save tokens and user info
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const userObj = {
        username: data.username,
        email: data.email,
        role: data.role, 
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("username", userObj.username);
      localStorage.setItem("role", userObj.role.toLowerCase());

      setUser(userObj.username);
      setRole && setRole(userObj.role);
      setMessage("✅ Login successful!");

      const r = data.role.toLowerCase();
      if (r === "farmer") navigate("/farmer-dashboard");
      else if (r === "vendor") navigate("/vendor-dashboard");
      else if (r === "admin" || r === "administrator") navigate("/admin-dashboard");
      else navigate("/");

    } catch (error) {
      console.error("❌ Login failed:", error);
      setMessage("⚠️ Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-300 via-green-500 to-green-700 text-white px-4">
      <motion.div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-10 w-full max-w-md text-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
        <LogIn className="w-12 h-12 mx-auto text-lime-200 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="text-black rounded-lg py-4 px-3" />
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="text-black rounded-lg py-4 px-3 pr-12" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <Button type="submit" disabled={loading} className={`w-full py-4 rounded-2xl mt-6 ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-6 text-sm text-white/80">
          Don’t have an account? <a href="/register" className="text-lime-200 font-semibold hover:underline">Register here</a>
        </p>
      </motion.div>
    </div>
  );
}