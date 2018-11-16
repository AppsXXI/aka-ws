const express = require('express');
const helmet = require('helmet');

// DataBase
require('./db/dbconnect');

// Controllers
const UserController = require('./user/UserController');
const AuthController = require('./auth/AuthController');

const app = express();
const port = process.env.PORT || 3200;
const apiBase = '/api';

app.use(helmet());
app.use(`${apiBase}/users`, UserController);
app.use(`${apiBase}/auth`, AuthController);

console.log('Server starting...');
app.get('/', (req, res) => {
  const serverOnlineMsg = 'Server is online and waiting...';
  console.log(serverOnlineMsg);
  res.send(serverOnlineMsg);
});

app.listen(port, () => {
  console.log('Server is started!');
});
