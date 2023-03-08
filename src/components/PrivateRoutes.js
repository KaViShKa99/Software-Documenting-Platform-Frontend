import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie/cjs/Cookies";

const cookies = new Cookies();

const PrivateRoutes = () => {
  let auth = cookies.get("token");

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
