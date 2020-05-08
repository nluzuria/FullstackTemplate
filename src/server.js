import "./utils.css";
import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { schema } from "./db/graphql/blog_schema";
import { ApolloServer } from "apollo-server-express";
import { connectWithRetry } from "./db/_mongo";
import { createSampleDataIfDbEmpty } from "./db/utils/createSampleData";

const { PORT, NODE_ENV } = process.env;
const isRunningInDevelopment = NODE_ENV === "development";

// Connect with mongodb database and will with sample data if empty
connectWithRetry();
if (isRunningInDevelopment) {
  createSampleDataIfDbEmpty();
}

const app = polka(); // You can also use Express

const apollo_server = new ApolloServer({
  schema: schema,
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "light",
    },
  },
});

apollo_server.applyMiddleware({
  app: app,
  path: "/graphql",
});

app
  .use(
    compression({ threshold: 0 }),
    sirv("static", { isRunningInDevelopment }),
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

module.exports = { app };
