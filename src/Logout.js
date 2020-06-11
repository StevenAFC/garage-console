import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();
  localStorage.removeItem("token");
  history.push("/login");
  return <p>Logout</p>;
};

export default Logout;
