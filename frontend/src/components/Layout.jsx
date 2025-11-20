import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-green-50 text-gray-900">
      <Navbar />
      <main className="p-8">{children}</main>
    </div>
  );
}