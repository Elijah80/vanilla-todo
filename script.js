const addTaskBtn = document.getElementById('addTask');

document.addEventListener("DOMContentLoaded", function() {
  // Check if tasks exist in local storage
  if(localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks(tasks);
  }
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value !== "") {
    let tasks = [];

    // Check if tasks exist in local storage
    if(localStorage.getItem("tasks")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(taskInput.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(tasks);

    taskInput.value = "";
  }
}

function removeTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks && tasks.length > index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
  }
}

function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");

  // Clear previous tasks
  taskList.innerHTML = "";

  tasks.forEach(function(task, index) {
    const li = document.createElement("li");
    li.classList.add('todo-item');
    li.textContent = task;

    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.classList.add('fa-solid', 'fa-trash', 'delete-task');
    deleteTaskBtn.onclick = function() {
      removeTask(index);
    };

    li.appendChild(deleteTaskBtn);
    taskList.appendChild(li);
  });
}


addTaskBtn.addEventListener('click', addTask);