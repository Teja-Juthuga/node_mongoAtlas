var express = require("express");
var router = express.Router();

const { MongoClient,ObjectId } = require("mongodb");

const url = "mongodb+srv://teja_071199:aJuCarTg8xYzbiQI@atlascluster.a4vovbu.mongodb.net/taskManagerApp?retryWrites=true&w=majority";
const client = new MongoClient(url);

const dbName = "taskManagerApp";

async function getDbConnection(task) {
    await client.connect();
    console.log("connect to getTasksServer");
    const db = client.db(dbName);
    const collection = db.collection("pendingTasks");
    const docIdToFind = new ObjectId(task.taskId);
    var result = collection.find({}).toArray();
    return result;
}

router.get("/", (request, response) => {
    var allTasks = [];
    getDbConnection(request.query)
    .then((res) => {
        // console.log(res);
        allTasks = res;
        response.send(JSON.stringify(allTasks));
    });
});

module.exports = router;
