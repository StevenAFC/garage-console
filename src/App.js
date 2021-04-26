import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Logout from "./Logout";
import Menu from "./Menu";
import ProtectedRoute from "./ProtectedRoute";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PushMessageSubscriber from "./PushMessageSubscriber";
import "./App.css";

import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <div className="App" style={{ paddingTop: 5 }}>
      <Router>
        <Container>
          <Menu />
          <PushMessageSubscriber />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/" component={Dashboard} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
