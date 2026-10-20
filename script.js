
const taskInput = document.getElementById("task-input");
const addButton = document.querySelector(".add-button");
const taskList = document.querySelector(".task-list");

// Save all tasks to localStorage
function saveTasks() {
    const tasks = [];

    document.querySelectorAll(".task-item .task-text").forEach(function (task) {
        tasks.push(task.textContent);
    });

    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Delete the existing tasks
function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.closest(".task-item").remove();
            saveTasks();
        });
    });
}

// Create a new task
function createTask(taskText) {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    const taskTitle = document.createElement("span");
    taskTitle.classList.add("task-text");
    taskTitle.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("delete-button");
    deleteButton.type = "button";

    deleteButton.addEventListener("click", function () {
        listItem.remove();
        saveTasks();
    });

    listItem.appendChild(taskTitle);
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        alert("Please enter a task...");
        return;
    }

    createTask(taskText);

    // Save the updated task list
    saveTasks();

    // Clear the input field
    taskInput.value = "";
    taskInput.focus();
}

// Load saved tasks when the page opens
function loadTasks() {
    const savedTasks = localStorage.getItem("todoTasks");

    if (savedTasks !== null) {
        taskList.innerHTML = "";

        const tasks = JSON.parse(savedTasks);

        tasks.forEach(function (taskText) {
            createTask(taskText);
        });
    } else {
        // Keep the sample tasks on the first visit
        setupDeleteButtons();
        saveTasks();
    }
}

// Set up the event listeners
addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

// Restore tasks when the page opens
loadTasks();
