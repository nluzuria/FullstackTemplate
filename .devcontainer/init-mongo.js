var rootUser = process.env.MONGO_INITDB_ROOT_USERNAME;
var rootPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

console.log("Root User: " + rootUser);

db.auth(rootUser, rootPassword);

db.createUser({
  user: "user",
  pwd: "password",
  roles: [
    {
      role: "readWrite",
      db: "collection",
    },
  ],
});
