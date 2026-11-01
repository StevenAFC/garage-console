import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { split, ApolloLink } from "apollo-link";
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

const subscriptionClient = new SubscriptionClient(
  process.env.REACT_APP_API_SERVER_WS,
  {
    reconnect: true,
    lazy: true,
    // Close the socket if the server's keep-alive stops arriving (half-open socket)
    timeout: 30000,
    // Read the token on every (re)connect so a login after page load is picked up
    connectionParams: () => ({
      token: localStorage.getItem("token"),
    }),
  }
);

const wsLink = new WebSocketLink(subscriptionClient);

// If the server rejects our token (expired, invalid), drop it and go to login
// instead of leaving the user on a dashboard that can't load anything.
const authErrorLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const rejected =
      response.errors &&
      response.errors.some(
        (e) => e.extensions && e.extensions.code === "UNAUTHENTICATED"
      );

    if (rejected) {
      localStorage.removeItem("token");
      subscriptionClient.close();
      window.location.assign("/login");
    }

    return response;
  })
);

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
  link: ApolloLink.from([authErrorLink, setAuthorizationLink, link]),
});

// Events published while the socket was down are lost, so refetch queries
// whenever the subscription connection comes back.
subscriptionClient.onReconnected(() => client.reFetchObservableQueries());

// Mobile browsers freeze backgrounded PWAs, which can leave the socket dead
// while it still reports OPEN. When the app comes back after a while, force
// a fresh connection (subscriptions are resent) and resync.
const STALE_AFTER_MS = 30000;
let hiddenAt = null;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    hiddenAt = Date.now();
    return;
  }

  const wasAwayLong = hiddenAt && Date.now() - hiddenAt > STALE_AFTER_MS;
  hiddenAt = null;

  if (wasAwayLong || subscriptionClient.status !== WebSocket.OPEN) {
    // close(isForced = false, closedByUser = false) triggers the reconnect logic
    subscriptionClient.close(false, false);
  } else {
    client.reFetchObservableQueries();
  }
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
const activateWaitingWorker = (registration) => {
  if (registration && registration.waiting) {
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
  }
};

serviceWorkerRegistration.register({
  // A new build finished installing while the app was open: activate it now
  onUpdate: activateWaitingWorker,
});

if ("serviceWorker" in navigator) {
  // Reload once the new worker takes control so the page runs the new build
  // (skip the very first install, where there is no old build to replace)
  let reloading = false;
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloading || !hadController) return;
    reloading = true;
    window.location.reload();
  });

  // An update may already be waiting from a previous visit
  navigator.serviceWorker.ready.then(activateWaitingWorker);

  // Installed PWAs are rarely reloaded, so check for a new build whenever the
  // app comes back to the foreground
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    navigator.serviceWorker
      .getRegistration()
      .then((registration) => registration && registration.update())
      .catch(() => {});
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
