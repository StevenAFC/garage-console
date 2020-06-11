import React from "react";
import { Route, Redirect } from "react-router-dom";
import decode from "jwt-decode";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  try {
    decode(token);
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};

const ProtectedRoute = ({
  component: Component,
  requiresAuthentication = true,
  redirectTo = "/login",
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === requiresAuthentication ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: redirectTo,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
