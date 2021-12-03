import React from "react";
import Menu from "./Menu";
import { Container } from "semantic-ui-react";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import decode from "jwt-decode";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

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

const App = () => {
  const authenticated = isAuthenticated();

  const routing = useRoutes(routes(authenticated));

  return (
    <div className="App" style={{ paddingTop: 5 }}>
      <Container>
        <Menu authenticated={authenticated} />
        <>{routing}</>
      </Container>
    </div>
  );
};

export default App;
