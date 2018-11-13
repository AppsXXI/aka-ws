const express = require("express");
const helmet = require("helmet");
const db = require("./db/dbconnect");
const UserController = require("./user/UserController");

const app = express();
const port = process.env.PORT || 3200;

app.use(helmet());
app.use('/users', UserController);

app.get("/", (req, res) => {
  res.send("Server is online and waiting...");
});

app.listen(port);
