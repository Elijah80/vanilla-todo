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
  } else {
    alert('Please enter a task!');
    return;
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

function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks && tasks.length > index) {
    const editedTask = prompt('Edit the task:', tasks[index]);

    if (editedTask !== null && editedTask.trim() !== '') {
      tasks[index] = editedTask.trim();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks(tasks);
    } else {
      alert('A blank edit is not permitted. Please enter a valid edit.');
    }
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

    const editTaskBtn = document.createElement('button');
    editTaskBtn.classList.add('fa-solid', 'fa-pen-to-square', 'edit-task');
    editTaskBtn.title = 'Edit Task';
    editTaskBtn.onclick = function() {
      editTask(index);
    };

    const deleteTaskBtn = document.createElement('button');
    deleteTaskBtn.classList.add('fa-solid', 'fa-trash', 'delete-task');
    deleteTaskBtn.title = 'Delete Task';
    deleteTaskBtn.onclick = function() {
      removeTask(index);
    };

    li.appendChild(editTaskBtn);
    li.appendChild(deleteTaskBtn);
    taskList.appendChild(li);
  });
}


addTaskBtn.addEventListener('click', addTask);