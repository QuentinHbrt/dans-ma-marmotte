import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "theme-ui";
import { GraphqlClient } from "./api/graphqlClient";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import "bootstrap/dist/css/bootstrap.min.css";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN } from "./api/constants";

const authLink = setContext((_, { headers }) => {
  // const user = netlifyIdentity.currentUser();
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "/",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={GraphqlClient}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
