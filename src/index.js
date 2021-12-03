import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const setAuthorizationLink = setContext((request, previousContext) => ({
  headers: {
    ...previousContext.headers,
    token: localStorage.getItem("token"),
  },
}));

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_SERVER_HTTP,
  headers: {
    "client-name": "Garage Console App",
    token: localStorage.getItem("token"),
  },
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_API_SERVER_WS,
  options: {
    reconnect: true,
    connectionParams: {
      token: localStorage.getItem("token"),
    },
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: setAuthorizationLink.concat(link),
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
