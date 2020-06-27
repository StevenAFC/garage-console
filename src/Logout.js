import React from "react";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

const Logout = () => {
  let history = useHistory();

  const client = useApolloClient();
  client.resetStore();

  localStorage.removeItem("token");
  history.push("/login");
  return <p>Logout</p>;
};

export default Logout;
