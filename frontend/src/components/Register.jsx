import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register, login } from "../api";

export default function Register() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("farmer");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reg = await register({ username, email, password, role });
      const cleanRole = (reg.role || "").toLowerCase();

      const auth = await login({ email, password });

      localStorage.setItem("access", auth.access);
      localStorage.setItem("refresh", auth.refresh);
      localStorage.setItem("username", auth.username);
      localStorage.setItem("role", cleanRole);

      if (cleanRole === "farmer") nav("/farmer");
      else if (cleanRole === "vendor") nav("/vendor");
      else nav("/admin");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Full name"
          className="w-full border p-2 mb-2"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 mb-2"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full border p-2 mb-2"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 mb-4"
        >
          <option value="farmer">Farmer</option>
          <option value="vendor">Vendor</option>
          <option value="administrator">Administrator</option>
        </select>
        <button className="w-full bg-green-600 text-white p-2 rounded" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </div>
  );
}