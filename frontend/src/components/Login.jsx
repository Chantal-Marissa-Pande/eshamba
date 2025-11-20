import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await login({ email, password });
      const role = (res.role || "").toLowerCase();
      localStorage.setItem("access", res.access);
      localStorage.setItem("refresh", res.refresh);
      localStorage.setItem("username", res.username);
      localStorage.setItem("role", role);

      if (role === "farmer") nav("/farmer");
      else if (role === "vendor") nav("/vendor");
      else nav("/admin");
    } catch (err) {
      console.error(err);
      setErr("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 mb-3"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full border p-2 mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}