import mongoose from "mongoose";

const host = "mongoservice";
const port = 27017;

const dbuser = process.env.MONGO_INITDB_USERNAME;
const password = process.env.MONGO_INITDB_PASSWORD;
const collection = process.env.MONGO_INITDB_DATABASE;

const connectionString = `mongodb://${dbuser}:${password}@${host}:${port}/${collection}`;

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
  setTimeout(connectWithRetry, 5000);
});

mongoose.connection.on("connected", () => {
  console.log(`MongoDB is connected`);
});

export const connectWithRetry = () => {
  console.log("Attempting to connect to mongoDB with retry");
  return mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
