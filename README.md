# Ex03 To-Do List using JavaScript
## Date:17-11-2026

## AIM
To create a To-do Application with all features using JavaScript.

## ALGORITHM
### STEP 1
Build the HTML structure (index.html).

### STEP 2
Style the App (style.css).

### STEP 3
Plan the features the To-Do App should have.

### STEP 4
Create a To-do application using Javascript.

### STEP 5
Add functionalities.

### STEP 6
Test the App.

### STEP 7
Open the HTML file in a browser to check layout and functionality.

### STEP 8
Fix styling issues and refine content placement.

### STEP 9
Deploy the website.

### STEP 10
Upload to GitHub Pages for free hosting.

## PROGRAM

todo.html
```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My To-Do List</title>
    <link rel="stylesheet" href="todo.css">
</head>
<body>

    <div class="app-container">

        <h1 class="title">✨ My To-Do List ✨</h1>

        <div class="input-section">
            <input type="text" id="taskInput"
                   placeholder="Enter a new task...">
            <button id="addBtn">Add</button>
        </div>

        <div class="filter-section">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>

        <ul id="taskList" class="task-list"></ul>

        <button id="clearAll" class="clear-btn">Clear All</button>

    </div>

    <script src="todo.js"></script>

</body>
</html>

```
todo.css
```

body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #89f7fe, #66a6ff);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
}

.app-container {
    background: white;
    width: 400px;
    max-width: calc(100% - 40px);
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    animation: fadeIn 1s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.input-section {
    display: flex;
    gap: 10px;
}

.input-section input {
    flex: 1;
    min-width: 0;
    padding: 10px;
    border: 2px solid #66a6ff;
    border-radius: 10px;
    outline: none;
}

.input-section button {
    background: #66a6ff;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
    color: white;
    cursor: pointer;
}

.input-section button:hover {
    background: #557ed6;
}

.filter-section {
    display: flex;
    justify-content: center;
    margin: 15px 0;
    gap: 10px;
    flex-wrap: wrap;
}

.filter-btn {
    background: #eee;
    border: none;
    padding: 6px 12px;
    border-radius: 20px;
    cursor: pointer;
}

.filter-btn.active,
.filter-btn:hover {
    background: #66a6ff;
    color: white;
}

.task-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.task-list li {
    background: #f9f9f9;
    padding: 12px;
    border-radius: 12px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.task-list li.completed .task-text {
    text-decoration: line-through;
    opacity: 0.6;
}

.task-text {
    flex: 1;
    cursor: pointer;
    overflow-wrap: anywhere;
}

.actions {
    display: flex;
    gap: 8px;
}

.actions button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
}

.actions .edit {
    color: #ffa502;
}

.actions .delete {
    color: #ff4757;
}

.clear-btn {
    margin-top: 15px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 12px;
    background: #ff4757;
    color: white;
    cursor: pointer;
}

.clear-btn:hover {
    background: #e84118;
}

.empty-message {
    text-align: center;
    color: #888;
    padding: 10px;
}
```
todo.js
```

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearAllBtn = document.getElementById("clearAll");

// Get tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
addBtn.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Display Tasks
function renderTasks(filter = getActiveFilter()) {
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        const li = document.createElement("li");
        li.className = "empty-message";
        li.textContent = "No tasks found!";
        taskList.appendChild(li);
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Task Text
        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        span.addEventListener("click", () => {
            toggleTask(task.id);
        });

        // Action Buttons
        const actions = document.createElement("div");
        actions.className = "actions";

        // Edit Button
        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.textContent = "✏️";
        editBtn.title = "Edit task";

        editBtn.addEventListener("click", () => {
            editTask(task.id);
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "🗑️";
        deleteBtn.title = "Delete task";

        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });
}

// Complete Task
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

// Edit Task
function editTask(id) {
    const task = tasks.find(task => task.id === id);

    const newText = prompt("Edit task:", task.text);

    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();

        saveTasks();
        renderTasks();
    }
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

// Clear All Tasks
clearAllBtn.addEventListener("click", () => {
    if (confirm("Delete all tasks?")) {
        tasks = [];

        saveTasks();
        renderTasks();
    }
});

// Filter Tasks
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            .classList.remove("active");

        btn.classList.add("active");

        renderTasks(btn.dataset.filter);
    });
});

// Save Tasks in Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get Active Filter
function getActiveFilter() {
    return document.querySelector(".filter-btn.active").dataset.filter;
}

// Display tasks when page loads
renderTasks();
```


## output
![alt text](<Screenshot 2026-11-17 134301.png>)


![alt text](<Screenshot 2026-11-17 134408.png>)





## RESULT
The program for creating To-do list using JavaScript is executed successfully.