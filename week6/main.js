import Todo from './todo.js';

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
    saveList();
}

function saveList() {
    localStorage.setItem(localStorageName, JSON.stringify(todoArray));
    displayList();
}

function loadList() {
    const savedTodoArray = JSON.parse(localStorage.getItem(localStorageName));
    if(savedTodoArray !== null) todoArray = savedTodoArray;
    if(todoArray.length !== 0) displayList();
}

function displayList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    console.table(todoArray);
    for(let i=0; i< todoArray.length; i++) {
        const li = document.createElement('li');
        li.classList.add('item');
        const check = todoArray[i].completed ? 'checked' : 'unchecked';
        li.innerHTML = `<label for'${todoArray[i].id}'><input type='checkbox' id='${todoArray[i].id}' ${check}>${todoArray[i].content}</label>`;
        const button = document.createElement('button');
        button.classList.add('delete-btn');
        button.textContent = "X";

        // delete button event listener
        button.addEventListener('click', event => {
            deleteTodo(i, event);
        });

        li.appendChild(button);
        todoList.appendChild(li);

        const label = li.firstElementChild;

        // checkmark event listener
        label.addEventListener('click', event => {
            addRemoveCheck(i, event);
        });

        // strike through text if checked and turn button red on hover
        if(todoArray[i].completed) {
            label.style.textDecoration = 'line-through';
            button.style.backgroundColor = 'orange';
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = 'red';
            });
            button.addEventListener('mouseleave', () => {
                button.style.backgroundColor = 'orange';
            });
        }
    }
}

function deleteTodo(i, event) {
    event.preventDefault();
    todoArray.splice(i, 1);
    saveList();
}

function addRemoveCheck(i, event) {
    // stop event propogation
    event.preventDefault();
    // check or uncheck manually
    if(event.target.firstElementChild.checked) {
        event.target.firstElementChild.checked = false;
        todoArray[i].completed = false;
    } else {
        event.target.firstElementChild.checked = true;
        todoArray[i].completed = true;
    }
    saveList();
}