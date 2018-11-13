const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require("./User");

router.post("/", (req, res) => {
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.password);
  
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }, (error, user) => {
    if (error) {
      return res.status(500).send("There was a problem adding the information to the database.");
    }

    res.status(200).send(user);
  });
});

router.get("/", (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      return res.status(500).send("There was a problem finding users.");
    }

    res.status(200).send(users);
  });
});

module.exports = router;