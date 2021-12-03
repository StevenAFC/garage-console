import { Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Logout from "./Logout";

const routes = (isAuthenticated) => [
  {
    path: "/",
    element: isAuthenticated ? <Dashboard /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
  },
  {
    path: "/logout",
    element: isAuthenticated ? <Logout /> : <Navigate to="/login" />,
  },
];

export default routes;
