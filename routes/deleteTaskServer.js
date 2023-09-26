var express = require("express");
var router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb+srv://teja_071199:aJuCarTg8xYzbiQI@atlascluster.a4vovbu.mongodb.net/taskManagerApp?retryWrites=true&w=majority";
const client = new MongoClient(url);

const dbName = "taskManagerApp";

async function getDbConnection(task) {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection("pendingTasks");

        const docIdToDel = new ObjectId(task.taskId);

        const result = await collection.deleteOne({ _id: docIdToDel });
        console.log("Deleted document:", result);

        return result;
    } catch (err) {
        console.error(err);
    } finally {
        // Ensure you close the connection when done
        client.close();
    }
}

router.post("/", async (request, response) => {
    try {
        console.log(request.body);
        console.log(request.body.taskId);

        const result = await getDbConnection(request.body);
        console.log("Deleted document:", result);

        response.send("Deleted Successfully");
    } catch (err) {
        console.error(err);
        response.status(500).send("Internal Server Error");
    }
});

module.exports = router;

/*

var express = require("express");
var router = express.Router();

const { MongoClient, ObjectID } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "taskManagerApp";

async function getDbConnection(task) {
    await client.connect();
    console.log("connect to deleteTaskServer");
    const db = client.db(dbName);
    const collection = db.collection("pendingTasks");
    const ObjectId = require('mongodb').ObjectId;
    const docIdToDel = new ObjectID(task.taskId);
    result = collection.deleteOne({ "_id" : docIdToDel });
    // console.log(result);

    return result;
}

router.post("/", (request, response) => {
    console.log(request.body);
    console.log(request.body.taskId);
    getDbConnection(request.body)
        .then((res) => {
            console.log("------" + res);
        })
        .catch((err) => {
            console.log(err);
        });
    response.send("Deleted Successfully");
});

module.exports = router;
*/
