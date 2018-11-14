const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require("./User");

router.post("/", (req, res) => {
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

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) {
      return res.status(500).send("There was a problem getting the user.");
    }

    if (!user) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send(user);
  });
});

router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, user) => {
    if (error) {
      return res.status(500).send("There was a problem updating the user.");
    }

    res.status(200).send(user);
  });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      return res.status(500).send("There was a problem deleting the user.");
    }

    res.status(200).send(`User ${user.name} was deleted successful.`);
  });
});

module.exports = router;