import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Userlayout } from "./components/userComponents";
import {
  Cartpage,
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
