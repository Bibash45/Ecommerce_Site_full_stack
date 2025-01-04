import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Userlayout } from "./components/userComponents";
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
} from "./pages/userPages";
import { Adminlayout } from "./components/adminComponents";
import { AdminProductpage, Dashboardpage } from "./pages/adminPages";
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
        path: "/confirmation/:confirmationToken",
        element: <EmailConfirmationpage />,
      },
      {
        path: "/cart",
        element: <Cartpage />,
      },
      {
        path: "/shipping",
        element: <Shippingpage />,
      },
      {
        path: "/confirm",
        element: <Confirmpage />,
      },
      {
        path: "/myorders",
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
        path: "product",
        element: <AdminProductpage />,
      },
    ],
  },
]);

const Myroute = () => {
  return <RouterProvider router={router} />;
};

export default Myroute;
