const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../user/User');
const config = require('../config');
const verifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/register', (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  }, (error, user) => {
    if (error) {
      return res.status(500).send('There was a problem registering the user.');
    }

    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });

    return res.status(200).send({ auth: true, token });
  });
});

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      return res.status(500).send('There was a server error.');
    }

    if (!user) {
      return res.status(404).send('No user found.');
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });

    return res.status(200).send({ auth: true, token });
  });
});

router.post('/authenticate', verifyToken, (req, res) => {
  User.findById(req.userId, { password: 0 }, (error, user) => {
    if (error) {
      return res.status(500).send('There was a problem finding the user.');
    }

    if (!user) {
      return res.status(404).send('No user found.');
    }

    return res.status(200).send(user);
  });
});

router.get('/logout', (req, res) => res.status(200).send({ auth: false, token: null }));

module.exports = router;
