import ApolloClient from "apollo-boost";
import fetch from "node-fetch";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  fetch: fetch,
});

export { client };
