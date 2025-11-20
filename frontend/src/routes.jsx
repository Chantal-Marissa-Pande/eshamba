import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import VendorDashboard from "./components/VendorDashboard";
import FarmerDashboard from "./components/FarmerDashboard";

export const routes = [
  { path: "/", element: <Layout><LandingPage /></Layout> },
  { path: "/login", element: <Layout><Login /></Layout> },
  { path: "/register", element: <Layout><Register /></Layout> },
  {
    path: "/admin",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["administrator"]}>
          <AdminDashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/vendor",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["vendor"]}>
          <VendorDashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
  {
    path: "/farmer",
    element: (
      <Layout>
        <ProtectedRoute allowedRoles={["farmer"]}>
          <FarmerDashboard />
        </ProtectedRoute>
      </Layout>
    ),
  },
];