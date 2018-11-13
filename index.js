const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is online and waiting...");
});

app.listen(3200);
