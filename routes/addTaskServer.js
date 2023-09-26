var express = require("express");
var router = express.Router();

// import mongodb module
const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb+srv://teja_071199:aJuCarTg8xYzbiQI@atlascluster.a4vovbu.mongodb.net/taskManagerApp?retryWrites=true&w=majority";
const client = new MongoClient(url);

const dbName = "taskManagerApp";

async function getDbConnection(taskData) {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("pendingTasks");
    result = collection.insertOne(taskData);
    return result;
}

router.post("/", function (req, res) {
    var responseData = {};
    console.log(req.body);
    getDbConnection(req.body).then((response) => {
        if (response.insertedId) {
            responseData.msg = "Inserted";
        } else {
            responseData.msg = "Error";
        }
        res.send(JSON.stringify(responseData));
    });
});

module.exports = router;
