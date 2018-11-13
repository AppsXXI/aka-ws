const express = require("express");
const app = express();
const port = process.env.PORT || 3200;

app.get("/", (req, res) => {
  res.send("Server is online and waiting...");
});

app.listen(port);
