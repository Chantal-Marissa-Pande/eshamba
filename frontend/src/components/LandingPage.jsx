import { Link } from "react-router-dom";
import { Leaf, ShoppingBasket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      {/* Navbar space */}
      <header className="w-full py-6 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-700">E-Shamba</div>
        <nav className="flex gap-6">
          <Link to="/login" className="text-green-700 hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-green-700 hover:underline">
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-8 md:px-20">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            Welcome to E-Shamba
          </h1>
          <p className="text-lg md:text-xl text-green-800">
            Connect farmers, vendors, and buyers easily. Manage your produce, track inventory, and grow your business.
          </p>
          <div className="flex gap-4">
            <Link to="/register">
              <Button className="bg-green-600 text-black hover:bg-green-700">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-white text-green-600 border border-green-600 hover:bg-green-50">Login</Button>
            </Link>
          </div>
        </div>

        {/* Illustration / Icons */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow">
              <Leaf className="w-12 h-12 text-green-600 mb-2" />
              <span className="text-green-800 font-semibold">Fresh Produce</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow">
              <ShoppingBasket className="w-12 h-12 text-green-600 mb-2" />
              <span className="text-green-800 font-semibold">Easy Orders</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow">
              <Users className="w-12 h-12 text-green-600 mb-2" />
              <span className="text-green-800 font-semibold">Community</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow">
              <Leaf className="w-12 h-12 text-green-600 mb-2 rotate-12" />
              <span className="text-green-800 font-semibold">Sustainable</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 mt-10 bg-green-100 text-green-800 text-center">
        &copy; {new Date().getFullYear()} E-Shamba. All rights reserved.
      </footer>
    </div>
  );
}