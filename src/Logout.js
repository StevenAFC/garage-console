import React from "react";
import { Navigate } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

const Logout = () => {
  const client = useApolloClient();
  client.resetStore();

  localStorage.removeItem("token");

  return <Navigate to="/login" />;
};

export default Logout;
