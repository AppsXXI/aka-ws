const express = require("express");
const helmet = require("helmet");
// DataBase
const db = require("./db/dbconnect");
// User Controller
const UserController = require("./user/UserController");

const app = express();
const port = process.env.PORT || 3200;
const apiBase = '/api';

app.use(helmet());
app.use(`${apiBase}/users`, UserController);

console.log("Server starting...");
app.get("/", (req, res) => {
  console.log("Server is started!");
  res.send("Server is online and waiting...");
});

app.listen(port);
