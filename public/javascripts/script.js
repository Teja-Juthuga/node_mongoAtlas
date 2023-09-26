var responseMsgBlock = document.getElementById("responseMsgBlock");
var responseMsg = document.getElementById("responseMsg");

var displayTasks = () => {
    axios({
        method: "GET",
        url: "/getAllTasks",
    })
        .then(function (userTasks) {
            // console.log(userTasks.data);
            for (var i = 0; i < userTasks.data.length; i++) {
                createTemplate(userTasks.data[i]);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};
var addTask = () => {
    var taskTitle = document.getElementById("taskTitle").value;
    var taskDescription = document.getElementById("taskDescription").value;
    var task = {
        taskTitle,
        taskDescription,
    };

    axios({
        method: "POST",
        url: "/addTask",
        data: task,
    })
        .then(function (response) {
            // handle success
            console.log(response);
            if (response["status"] == 200) {
                responseMsgBlock.style.display = "block";
                responseMsg.innerText = "Task added to Your Pending Tasks";
                responseMsgBlock.style.color = "green";

                document.getElementById("taskTitle").value = "";
                document.getElementById("taskDescription").value = "";
                document.querySelector("#row").innerHTML = "";
                displayTasks();
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};

var createTemplate = (details) => {
    var templateEl = document.querySelector("#template");
    //console.log(templateEl.innerHTML);
    var tempHTML = Handlebars.compile(templateEl.innerHTML);

    var passingDataToTemp = tempHTML(details);

    var card1DivEl = document.createElement("div");
    card1DivEl.setAttribute("class", "card col-md-5 col-lg-3 mt-2 mb-2 p-3");
    card1DivEl.setAttribute("id", details._id["$oid"]);

    card1DivEl.innerHTML = passingDataToTemp;
    var card2DivEl = document.createElement("div");
    card2DivEl.setAttribute("class", "col-1 mt-2 mb-2");
    var cardContainerEl = document.querySelector("#row");
    cardContainerEl.append(card1DivEl);
    cardContainerEl.append(card2DivEl);
};

var editTask = (event) => {
    var taskId = event.target.id;
    
    var titleEl = document.getElementById("editTaskTitle" + taskId);
    var descriptionEl = document.getElementById("editTaskDescription" + taskId);

    console.log("editTask invoked");
    console.log(taskId);

    axios.post("/getTask", {
        taskId
    })
    .then((response)=>{
        console.log("Response from editTask Function ");
        console.log(response);
        titleEl.value = response.data.taskTitle;
        descriptionEl.value = response.data.taskDescription;
    })
    
};

var updateTask = (event) => {
    var taskId = event.target.id;
    var titleEl = document.getElementById("editTaskTitle" + taskId).value;
    var descriptionEl = document.getElementById("editTaskDescription" + taskId).value;
    var setTask = {};
    setTask.taskTitle =  titleEl;
    setTask.taskDescription = descriptionEl;
    console.log(setTask);

    axios.post("/updateTask", {
        taskId,
        setTask
    })
    .then((responseFromDB) => {
        console.log("I am from updateTask Function");
        console.log(responseFromDB);
        document.querySelector("#row").innerHTML = "";
        displayTasks();
    })
    .catch((error) => {
        console.log(error);
    })

}

var deleteTask = (event) => {
    var taskId = event.target.id;
    console.log(taskId);

    axios.post( "/deleteTask", {taskId: taskId })
    .then((response) => {
        console.log(response);
        document.querySelector("#row").innerHTML = "";
        displayTasks();
    });
};
