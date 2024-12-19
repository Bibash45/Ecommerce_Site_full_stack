import React from "react";
import Myroute from "./Myroute";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
    <ToastContainer position="top-center" />
      <Myroute />
    </>
  );
};

export default App;
