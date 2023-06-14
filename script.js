const addTaskBtn = document.getElementById('addTask')

document.addEventListener('DOMContentLoaded', function () {
	// Check if tasks exist in local storage
	if (localStorage.getItem('tasks')) {
		let tasks = JSON.parse(localStorage.getItem('tasks'))
		renderTasks(tasks)
	}
})

function addTask() {
	const taskInput = document.getElementById('taskInput')

	if (taskInput.value !== '') {
		let tasks = []

		// Check if tasks exist in local storage
		if (localStorage.getItem('tasks')) {
			tasks = JSON.parse(localStorage.getItem('tasks'))
		}

		tasks.push({
			title: taskInput.value,
			completed: false,
		})
		localStorage.setItem('tasks', JSON.stringify(tasks))

		renderTasks(tasks)

		taskInput.value = ''
	} else {
		alert('Please enter a task!')
		return
	}
}

function deleteTask(index) {
	let tasks = JSON.parse(localStorage.getItem('tasks'))

	if (tasks && tasks.length > index) {
		tasks.splice(index, 1)
		localStorage.setItem('tasks', JSON.stringify(tasks))
		renderTasks(tasks)
	}
}

function editTask(index) {
	let tasks = JSON.parse(localStorage.getItem('tasks'))

	if (tasks && tasks.length > index) {
		const editedTask = prompt('Edit the task:', tasks[index])

		if (editedTask !== null && editedTask.trim() !== '') {
			tasks[index].title = editedTask.trim()
			localStorage.setItem('tasks', JSON.stringify(tasks))
			renderTasks(tasks)
		} else {
			alert('A blank edit is not permitted. Please enter a valid edit.')
		}
	}
}

function completeTask(index) {
	let tasks = JSON.parse(localStorage.getItem('tasks'))

	if (tasks && tasks.length > index) {
		tasks[index].completed = !tasks[index].completed

		localStorage.setItem('tasks', JSON.stringify(tasks))
		renderTasks(tasks)
	}
}

function renderTasks(tasks) {
	const taskList = document.getElementById('taskList')

	// Clear previous tasks
	taskList.innerHTML = ''

	tasks.forEach(function (task, index) {
		const li = document.createElement('li')
		const taskTitle = document.createElement('span')

		li.classList.add('todo-item')

		taskTitle.textContent = task.title

		if (task.completed) {
			taskTitle.classList.add('completed')
		}

		const completeTaskBtn = document.createElement('button')
		completeTaskBtn.classList.add('complete-task')
    completeTaskBtn.title = 'Complete';
		completeTaskBtn.textContent = task.completed ? 'Undo' : completeTaskBtn.classList.add('fa-solid', 'fa-check');
		completeTaskBtn.onclick = function () {
			completeTask(index)
		}

		const editTaskBtn = document.createElement('button')
		editTaskBtn.classList.add('fa-solid', 'fa-pen-to-square', 'edit-task')
		editTaskBtn.title = 'Edit'
		editTaskBtn.onclick = function () {
			editTask(index)
		}

		const deleteTaskBtn = document.createElement('button')
		deleteTaskBtn.classList.add('fa-solid', 'fa-trash', 'delete-task')
		deleteTaskBtn.title = 'Delete'
		deleteTaskBtn.onclick = function () {
			deleteTask(index)
		}

		li.appendChild(taskTitle)
		li.appendChild(completeTaskBtn)
		li.appendChild(editTaskBtn)
		li.appendChild(deleteTaskBtn)
		taskList.appendChild(li)
	})
}

addTaskBtn.addEventListener('click', addTask)
