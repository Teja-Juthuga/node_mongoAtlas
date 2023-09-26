const express = require("express");
const router = express.Router();

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

        const filter = { _id: new ObjectId(task.taskId) };

        const document = await collection.findOne(filter);

        if (document) {
            console.log("Found document:", document);
        } else {
            console.log("Document not found");
        }

        return document;
    } catch (err) {
        console.error(err);
    } finally {
        // Ensure you close the connection when done
        client.close();
    }
}

router.post("/", (request, response) => {
    console.log(typeof request.body.taskId);
    // response.send("fetching");
    var task = [];
    getDbConnection(request.body)
        .then((responseFromDb) => {
            task = responseFromDb;
            response.send(JSON.stringify(task));
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;

/*
var express = require("express");
var router = express.Router();

const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbName = "taskManagerApp";

async function getDbConnection(task){
    await client.connect();
    console.log("connect to getTasksServer");
    const db = client.db(dbName);
    const collection = db.collection("pendingTasks");
    const docIdToFind = new ObjectId(task.taskId);
    console.log(docIdToFind);
    var result = await collection.find({ _id: docIdToFind }).toArray();
    return result;
}

router.post("/", (request, response) => {
    var allTasks = [];
    getDbConnection(request.body).then((res) => {
        console.log(res);
        allTasks = res;
        response.send(JSON.stringify(allTasks));
    });
});

module.exports = router;
*/
