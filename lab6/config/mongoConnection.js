var MongoClient = require("mongodb").MongoClient;
var mongoURL = "mongodb://localhost:27017/";
var dbName = "Nidhi_Chovatiya_lab6";
var connection = undefined;
var db = undefined;

module.exports = async () => {
  if (!connection) {
    connection = await MongoClient.connect(mongoURL);
    db = await connection.db(dbName);

    console.log("DB have been connected successfully.");
  }
  return db;

};