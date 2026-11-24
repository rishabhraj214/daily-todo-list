
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// Show today's date
document.getElementById("date").textContent =
    new Date().toDateString();

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task
function addTask() {
    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        name: taskName,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    displayTasks();
}

// Display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const left = document.createElement("div");
        left.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.style.flex = "none";

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.name;
        span.className = task.completed ? "task-text completed" : "task-text";

        left.appendChild(checkbox);
        left.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        };

        li.appendChild(left);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    
const total = tasks.length;
const completed = tasks.filter(task => task.completed).length;
const pending = total - completed;

const percentage = total === 0
    ? 0
    : Math.round((completed / total) * 100);

document.getElementById("totalTasks").textContent = total;

document.getElementById("completedTasks").textContent = completed;

document.getElementById("pendingTasks").textContent = pending;

document.getElementById("percentage").textContent = percentage + "%";

document.getElementById("progressFill").style.width = percentage + "%";

}

// Enter key support
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Initial display
displayTasks();
