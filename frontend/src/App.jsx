import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/LuxuryLogin";
import Signup from "./pages/Auth/LuxurySignup";
import ChangePassword from "./pages/Auth/ChangePassword";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ProductDetails from "./pages/Home/LuxuryProductDetails";
import LuxuryShop from "./pages/Home/LuxuryShop";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import AdminOrders from "./admin/Orders";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/LuxuryAdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminContacts from "./admin/AdminContacts";
import Layout from "./layout/Layout";
import Cart from "./pages/Cart/LuxuryCart";
import Wishlist from "./pages/Cart/LuxuryWishlist";
import Checkout from "./pages/Checkout/LuxuryCheckout";
import OrderSuccess from "./pages/Orders/OrderSuccess";
import Profile from "./pages/Profile/LuxuryDashboard";
import AddAddress from "./pages/Address/AddAddress";
import EditProfile from "./pages/Profile/EditProfile";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import Luxury404 from "./pages/Utils/Luxury404";
import Contact from "./pages/Contact/Contact";
import { ProtectedRoute, PublicRoute } from "./components/Utils/RouteGuards";
import { SEO } from "./utils/seo";
import api from "./api/axios.js";

// Code splitting for heavy routes
const LazyAdminDashboard = lazy(() => import("./admin/LuxuryAdminDashboard"));
const LazyProductList = lazy(() => import("./admin/ProductList"));
const LazyAddProduct = lazy(() => import("./admin/AddProduct"));
const LazyEditProduct = lazy(() => import("./admin/EditProduct"));
const LazyAdminOrders = lazy(() => import("./admin/Orders"));
const LazyAdminUsers = lazy(() => import("./admin/AdminUsers"));
const LazyAdminContacts = lazy(() => import("./admin/AdminContacts"));

// Loading fallback for code-split components
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
);

const requireAdmin = (element) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  // Admin status is checked asynchronously in AdminCheckWrapper
  // (we can't use await directly in a route element)
  return <AdminCheckWrapper>{element}</AdminCheckWrapper>;
};

// Wrapper component to check admin status from DB
const AdminCheckWrapper = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await api.get("/user/check-admin");
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <SEO />
        <Layout />
      </Suspense>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "/signup", element: <PublicRoute><Signup /></PublicRoute> },
      { path: "/forgot-password", element: <PublicRoute><ForgotPassword /></PublicRoute> },
      { path: "/change-password", element: <ProtectedRoute><ChangePassword /></ProtectedRoute> },

      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/add-address", element: <ProtectedRoute><AddAddress /></ProtectedRoute> },
      { path: "/edit-profile", element: <ProtectedRoute><EditProfile /></ProtectedRoute> },
      { path: "/orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "/orders/:orderId", element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },

      { path: "/product/:id", element: <ProductDetails /> },
      // { path: "/shop", element: <LuxuryShop /> },
      { path: "/cart", element: <Cart /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/contact-us", element: <Contact /> },

      {
        path: "/admin",
        element: requireAdmin(<AdminLayout />),
        children: [
          { index: true, element: <Suspense fallback={<PageLoader />}><LazyAdminDashboard /></Suspense> },
          { path: "products", element: <Suspense fallback={<PageLoader />}><LazyProductList /></Suspense> },
          { path: "products/add", element: <Suspense fallback={<PageLoader />}><LazyAddProduct /></Suspense> },
          { path: "products/update/:id", element: <Suspense fallback={<PageLoader />}><LazyEditProduct /></Suspense> },
          { path: "orders", element: <Suspense fallback={<PageLoader />}><LazyAdminOrders /></Suspense> },
          { path: "users", element: <Suspense fallback={<PageLoader />}><LazyAdminUsers /></Suspense> },
          { path: "contacts", element: <Suspense fallback={<PageLoader />}><LazyAdminContacts /></Suspense> },
        ],
      },

      { path: "/checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "/order-success/:id", element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },

      { path: "*", element: <Luxury404 /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;