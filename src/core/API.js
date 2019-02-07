import ApolloClient from "apollo-boost";

const api = new ApolloClient({
  uri: "http://localhost:3030/query"
});

export default api;
