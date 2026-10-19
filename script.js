const taskInput = document.getElementById("task-input");
const addButton = document.querySelector(".add-button");
const taskList = document.querySelector(".task-list");

// Delete an existing task
function setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            button.closest(".task-item").remove();
        });
    });
}

// add a new task
function addtask() {
    const taskText = taskInput.value.trim();

    // Prevent empty task 
    if(taskInput.value.trim() === "") {
        alert("Please enter a task...");
        return;
    }

    // Create a new list item
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    // Create the task text
    const taskTitle = document.createElement("span");
    taskTitle.textContent = taskText;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.classList.add("delete-button");
    deleteButton.type = "button";

    // Delete task when clicked
    deleteButton.addEventListener("click", function () {
        listItem.remove();
    });

    // Put the task text and delete button inside a list item
    listItem.appendChild(taskTitle);
    listItem.appendChild(deleteButton);

    // Add the new task to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = "";
    taskInput.focus();
}

// Add a task when the add button is clicked
setupDeleteButtons();
addButton.addEventListener("click", addtask);

// Allow enter key to add a task
taskInput.addEventListener("keydown", function(event) {
    if(event.key === "Enter"){
        event.preventDefault();
        addtask();
    }
});