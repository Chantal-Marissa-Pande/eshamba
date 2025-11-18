import { Link } from "react-router-dom";
import { Leaf, ShoppingBasket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
      {/* Nav */}
      <header className="w-full py-6 px-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-green-700">
          <Leaf className="w-6 h-6" /> E-Shamba
        </h1>

        <div className="flex space-x-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Register
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-4">
          Empowering Farmers & Vendors
        </h2>

        <p className="text-lg text-gray-600 max-w-xl mb-8">
          A digital marketplace connecting farmers to trusted vendors with 
          transparency, efficiency, and ease.
        </p>

        <div className="flex space-x-4">
          <Link to="/register">
            <Button className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white">
              Join as Farmer
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" className="px-6 py-3">
              Explore Marketplace
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}