const mongoose = require("mongoose");
const mongoUsr = process.env.MONGO_USR || 'dev-admin-0001';
const mongoPss = process.env.MONGO_PSS || 'd3v-4dm1n-oooi';
const mongoDb = process.env.MONGO_DB || 'test';
const mongoUrl = `mongodb+srv://${mongoUsr}:${mongoPss}@cluster0-9tphu.mongodb.net/${mongoDb}?retryWrites=true`;

mongoose.connect(mongoUrl);