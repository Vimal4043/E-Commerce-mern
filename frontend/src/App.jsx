import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import AdminOrders from "./admin/Orders";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminContacts from "./admin/AdminContacts";
import Layout from "./layout/Layout";
import Cart from "./pages/Cart";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import AddAddress from "./pages/AddAddress";
import EditProfile from "./pages/EditProfile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import { ProtectedRoute, PublicRoute } from "./components/RouteGuards";

const requireAdmin = (element) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!token) return <Navigate to="/login"/>;
  if (!isAdmin) return <Navigate to="/"/>;
  return element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "/signup", element: <PublicRoute><Signup /></PublicRoute> },

      { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/add-address", element: <ProtectedRoute><AddAddress /></ProtectedRoute> },
      { path: "/edit-profile", element: <ProtectedRoute><EditProfile /></ProtectedRoute> },
      { path: "/orders", element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: "/orders/:orderId", element: <ProtectedRoute><OrderDetails /></ProtectedRoute> },

      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/contact-us", element: <Contact /> },

      {
        path: "/admin",
        element: requireAdmin(<AdminLayout />),
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "products", element: <ProductList /> },
          { path: "products/add", element: <AddProduct /> },
          { path: "products/update/:id", element: <EditProduct /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "users", element: <AdminUsers /> },
          { path: "contacts", element: <AdminContacts /> },
        ],
      },

      { path: "/checkout-address", element: <ProtectedRoute><CheckoutAddress /></ProtectedRoute> },
      { path: "/checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "/order-success/:id", element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },

      { path: "*", element: <NotFound /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;