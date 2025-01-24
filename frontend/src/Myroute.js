import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProfilePage, Userlayout } from "./components/userComponents";
import {
  Cartpage,
  CompletePaymentPage,
  FailurePaymentPage,
  Confirmpage,
  EmailConfirmationpage,
  Homepage,
  Loginpage,
  ProductDetailpage,
  Productpage,
  Registerpage,
  Shippingpage,
  FavouritesPage,
} from "./pages/userPages";
import { Adminlayout, Header } from "./components/adminComponents";
import {
  AdminAddCategorypage,
  AdminAddProductpage,
  AdminCategoryListpage,
  AdminOrders,
  AdminProductList,
  AdminProductpage,
  CustomerPage,
  Dashboardpage,
  OrderDetails,
  UpdateProduct,
} from "./pages/adminPages";
import MyOrders from "./pages/userPages/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "product/:productId",
        element: <ProductDetailpage />,
      },
      {
        path: "login",
        element: <Loginpage />,
      },
      {
        path: "register",
        element: <Registerpage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "confirmation/:confirmationToken",
        element: <EmailConfirmationpage />,
      },
      {
        path: "cart",
        element: <Cartpage />,
      },
      {
        path: "shipping",
        element: <Shippingpage />,
      },
      {
        path: "favourites",
        element: <FavouritesPage />,
      },
      {
        path: "confirm",
        element: <Confirmpage />,
      },
      {
        path: "myorders",
        element: <MyOrders />,
      },
      {
        path: "complete-payment",
        element: <CompletePaymentPage />,
      },
      {
        path: "failure-payment",
        element: <FailurePaymentPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      {
        index: true,
        element: <Dashboardpage />,
      },

      {
        path: "product/add",
        element: <AdminAddProductpage />,
      },
      {
        path: "product/update/:productId",
        element: <UpdateProduct />,
      },
      {
        path: "product/list",
        element: <AdminProductList />,
      },
      {
        path: "category",
        element: <AdminAddProductpage />,
      },
      {
        path: "category/list",
        element: <AdminCategoryListpage />,
      },
      {
        path: "category/update",
        element: <AdminAddProductpage />,
      },
      {
        path: "category/add",
        element: <AdminAddCategorypage />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "orders/details/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "customers",
        element: <CustomerPage />,
      },
    ],
  },
]);

const Myroute = () => {
  return <RouterProvider router={router} />;
};

export default Myroute;
