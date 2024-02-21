// PrivateRoute.js
import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if the token is not present
      window.location.href = "/";
    }
  }, [token]);

  return token ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
