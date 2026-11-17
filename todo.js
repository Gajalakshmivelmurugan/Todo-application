
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
