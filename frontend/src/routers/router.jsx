import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import WishlistPage from "../pages/wishlist/WishlistPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import UserProfile from "../pages/dashboard/UserProfile";
import UserPayments from "../pages/dashboard/UserPayments";
import UserOrders from "../pages/dashboard/UserOrders";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminProductUpload from "../pages/admin/AdminProductUpload";
import AdminDeliveryStatus from "../pages/admin/AdminDeliveryStatus";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:_id",
        element: <SingleProduct />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <DashboardHome />,
          },
          {
            path: "profile",
            element: <UserProfile />,
          },
          // {
          //   path: "payments",
          //   element: <UserPayments />,
          // },
          {
            path: "orders",
            element: <UserOrders />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminProductUpload />,
      },
      {
        path: "products",
        element: <AdminProductUpload />,
      },
      {
        path: "orders",
        element: <AdminDeliveryStatus />,
      },
    ],
  },
]);
