const addTodoBtn = document.getElementById('add-todo');

function getTodo(){
  event.preventDefault();
  const todoText = document.getElementById('todo-input');

  addToList(todoText.value);
  todoText.value = '';
}

function addToList(todo){
  const todoList = document.getElementById('todo-list');
  const li = document.createElement('li');
  const span = document.createElement('span');
  const completeIcon = document.createElement('i');
  const editIcon = document.createElement('i');
  const deleteIcon = document.createElement('i');

  li.classList.add('todo-item');
  completeIcon.classList.add('fa-solid');
  completeIcon.classList.add('fa-check');
  editIcon.classList.add('fa-solid');
  editIcon.classList.add('fa-pen-to-square');
  deleteIcon.classList.add('fa-solid');
  deleteIcon.classList.add('fa-trash');

  span.appendChild(document.createTextNode(todo));
  li.appendChild(span);
  li.appendChild(completeIcon);
  li.appendChild(editIcon);
  li.appendChild(deleteIcon);
  todoList.appendChild(li);
}

addTodoBtn.addEventListener('click', getTodo);