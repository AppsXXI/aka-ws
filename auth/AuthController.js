const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../user/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }, (error, user) => {
    if (error) {
      return res.status(500).send("There was a problem registering the user.");
    }

    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });

    res.status(200).send({ auth: true, token: token });
  });
});

router.post("/authenticate", (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
    }

    res.status(200).send(decoded);
  });
});

module.exports = router;
