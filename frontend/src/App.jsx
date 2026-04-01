import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
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
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      { path: "/profile", element: <Profile /> },
      { path: "/add-address", element: <AddAddress /> },
      { path: "/edit-profile", element: <EditProfile /> },
      { path: "/orders", element: <Orders /> },
      { path: "/orders/:orderId", element: <OrderDetails /> },

      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },

      { path: "/admin/products", element: requireAdmin(<ProductList />) },
      { path: "/admin/products/add", element: requireAdmin(<AddProduct />) },
      { path: "/admin/products/update/:id", element: requireAdmin(<EditProduct />) },

      { path: "/checkout-address", element: <CheckoutAddress /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },

      { path: "*", element: <NotFound /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;