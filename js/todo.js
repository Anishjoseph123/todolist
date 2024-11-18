// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("task-input");
  const description = taskInput.value.trim();

  if (description) {
    tasks.push({ description, completed: false });
    taskInput.value = "";
    renderTasks();
  }
}

// Function to mark a task as complete or incomplete
function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  // Separate completed and pending tasks
  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  // Merge them to show completed tasks at the end
  const orderedTasks = [...pendingTasks, ...completedTasks];

  orderedTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    if (task.completed) taskItem.classList.add("completed");

    const description = document.createElement("span");
    description.classList.add("description");
    description.textContent = task.description;

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    // Toggle complete/incomplete button
    const toggleButton = document.createElement("button");
    toggleButton.classList.add("complete");
    toggleButton.textContent = task.completed ? "Undo" : "Complete";
    toggleButton.onclick = () => toggleTaskStatus(tasks.indexOf(task));

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTask(tasks.indexOf(task));

    actions.appendChild(toggleButton);
    actions.appendChild(deleteButton);

    taskItem.appendChild(description);
    taskItem.appendChild(actions);
    taskList.appendChild(taskItem);
  });
}

// Initial render
renderTasks();
