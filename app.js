const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#filter-todo');

todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', setUp);

let todos = [];
let completed = [];

function createTodo(input = todoInput.value) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo-item');
  todoDiv.innerHTML = `
    <li>${input}</li>
    <button class="checked">
        <i class="fas fa-check"></i>
    </button>
    <button class="trashed">
        <i class="fas fa-trash"></i>
    </button
  `;
  todoList.appendChild(todoDiv);
}

function addTodo(e) {
  e.preventDefault();
  createTodo();
  todos.push(todoInput.value);
  saveTodos(todos);
  todoInput.value = '';
}

function deleteTodo(todo) {
  let index = todo.children[0].innerText;
  todos.splice(todos.indexOf(index), 1);
  saveTodos(todos);
}

function deleteCompleted(todo) {
  let index = todo.firstElementChild.innerText;
  completed.splice(completed.indexOf(index), 1);
  saveCompleted(completed);
}

function deleteCheck(e) {
  const deleteBtn = e.target.closest('.trashed');
  const checkBtn = e.target.closest('.checked');

  if (deleteBtn) {
    const todo = deleteBtn.parentElement;
    todo.classList.add('fall');
    deleteCompleted(todo);
    deleteTodo(todo);
    todo.addEventListener('transitionend', ()=> {
      if(event.propertyName === 'transform') {
        todo.remove();
      }
    });

  } else if (checkBtn) {
    const todo = checkBtn.parentElement.firstElementChild;
    todo.classList.toggle('completed');
    checkBtn.classList.toggle('btn-completed');

    if (todo.classList.contains('completed')) {
      completed.push(todo.innerText);
      saveCompleted(completed);
    } else if (!todo.classList.contains('completed')) {
      let index = todo.innerText;
      completed.splice(completed.indexOf(index), 1);
      saveCompleted(completed);
    }
  }      
}

function filterTodo(e) {
 const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch(e.target.value) {
      case 'all': 
        todo.style.display = 'flex';
      break;
      case 'completed':
        if(todo.firstElementChild.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
      break;
      case 'uncompleted':
        if(!todo.firstElementChild.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
      break;
    }
  });
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function saveCompleted(completed) {
  localStorage.setItem('completed', JSON.stringify(completed));
}

function getTodos() {
  return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
}

function getCompleted() {
  return localStorage.getItem('completed') ? JSON.parse(localStorage.getItem('completed')) : [];
}

function populateTodos(todos, completed) {
  todos = todos.filter(item =>  {
    return completed.indexOf(item) < 0;
  });

  completed.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');
    todoDiv.innerHTML = `
      <li class="completed">${todo}</li>
      <button class="checked btn-completed">
          <i class="fas fa-check"></i>
      </button>
      <button class="trashed">
          <i class="fas fa-trash"></i>
      </button
    `;
    todoList.appendChild(todoDiv);
  });

  todos.forEach(todo => {
    createTodo(todo);
  });
}

function setUp() {
  todos = getTodos();
  completed = getCompleted();
  populateTodos(todos, completed);
}



let arr = {
  monsters: [
    {
      name: 'Frankenstein',
      id: 'asasd'
    },
    {
      name: 'Dracula',
      id: 'asasd22'
    },
    {
      name: 'Zombie',
      id: 'asasd2aaas'
    },
  ]
};


let newARR = arr.monsters.map(monster => {
  return `${monster.name} id is ${monster.id}`;
});

console.log(newARR);
