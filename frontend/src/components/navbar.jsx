import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  return (
    <nav className="w-full p-4 bg-green-700 text-white flex justify-between items-center">
      <div className="font-bold text-lg">E-Shamba</div>
      <div className="flex items-center gap-4">
        <Link className="hover:underline" to="/">Home</Link>
        {role === "farmer" && <Link className="hover:underline" to="/farmer">Farmer</Link>}
        {role === "vendor" && <Link className="hover:underline" to="/vendor">Vendor</Link>}
        {role === "administrator" && <Link className="hover:underline" to="/admin">Admin</Link>}
        {!role ? (
          <Link className="hover:underline" to="/login">Login</Link>
        ) : (
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
        )}
      </div>
    </nav>
  );
}