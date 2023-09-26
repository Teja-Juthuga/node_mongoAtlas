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

        const filter = { _id: new ObjectId(task.taskId) }; // Replace 'your-document-id' with the actual _id of the document you want to update.
        const update = { $set: task.setTask }; // Specify the fields and values you want to update.

        const result = await collection.updateMany(filter, update);

        console.log("Updated document:", result);

        return result;
    } catch (err) {
        console.error(err);
    } finally {
        // Ensure you close the connection when done
        client.close();
    }
}

router.post("/", (request, response) => {
    console.log( request.body.taskId);
    getDbConnection(request.body)
    .then((responseFromDB) => {
        console.log(responseFromDB);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() =>{
        response.send("Updated");
    })
});

module.exports = router;
