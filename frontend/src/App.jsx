import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ProductDetails from "./pages/Home/ProductDetails";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import AdminOrders from "./admin/Orders";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminContacts from "./admin/AdminContacts";
import Layout from "./layout/Layout";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/Orders/OrderSuccess";
import Profile from "./pages/Profile/Profile";
import AddAddress from "./pages/Address/AddAddress";
import EditProfile from "./pages/Profile/EditProfile";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
import NotFound from "./pages/Utils/NotFound";
import Contact from "./pages/Contact/Contact";
import { ProtectedRoute, PublicRoute } from "./components/Utils/RouteGuards";

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