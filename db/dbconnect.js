const mongoose = require("mongoose");

// MONGO DB TEST
// var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://dev-admin-0001:d3v-4dm1n-oooi@cluster0-9tphu.mongodb.net/test?retryWrites=true";

// MongoClient.connect(uri, function(err, client) {
//    const collection = client.db("test").collection("devices");
//    // perform actions on the collection object
//    client.close();
// });
// ENDs MONGO DB TEST


mongoose.connect(uri);