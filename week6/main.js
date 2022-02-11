import Todo from './todo.js';

const todoList = document.getElementById('todoList');
const localStorageName = 'todoList';

let todoArray = [];

loadList();

document.forms['addTodo'].addEventListener('submit', addNewTodo);

function addNewTodo(event) {
    event.preventDefault();
    const input = document.forms['addTodo']['newContent'];
    const newContent = input.value;
    input.value = '';

    const todo = new Todo();
    todo.content = newContent;

    todoArray.push(todo);

    let li = document.createElement('li');
    li.classList.add('item');
    li.innerHTML = `<label for'${todo.id}'><input type='checkbox' id='${todo.id}'>${todo.content}</label>`;
    li.appendChild(todo.delete);
    todoList.appendChild(li);
    saveList();
    console.table(todoArray);
}

function saveList() {
    localStorage.setItem(localStorageName, todoList.innerHTML);
    if(localStorage.getItem(localStorageName)) console.log('ToDo List Saved :)');
    else console.log('TODO LIST NOT SAVED!!');
}

function loadList() {
    const savedTodoList = localStorage.getItem(localStorageName);
    todoList.innerHTML = savedTodoList;
    if(savedTodoList) console.log('ToDo List Loaded :)');
    else console.log('TODO LIST NOT LOADED!!');
}


