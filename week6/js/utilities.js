import {saveList} from './ls.js';
import {deleteTodo} from './todo.js';

let selection = 'all';

export function display(todoArray, s) {
    if(s !== undefined) selection = s;
    if(selection === 'active') displayActiveList(todoArray);
    else if(selection === 'completed') displayCompletedList(todoArray);
    else if(selection === 'all') displayList(todoArray);
}

export function displayList(todoArray, selection) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    document.getElementById('todo-count').innerHTML = `${todoArray.length} total`;
    if(todoArray.length === 0) todoList.innerHTML = 'Add a todo below...'
    else {
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
                todoArray = deleteTodo(todoArray, todoArray[i].id, event);
                saveList(todoArray);
                display(todoArray);
            });

            li.appendChild(button);
            todoList.appendChild(li);

            const label = li.firstElementChild;

            // checkmark event listener
            label.addEventListener('click', event => {
                addRemoveCheck(todoArray, todoArray[i].id, selection, event);
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
}

export function displayActiveList(todoArray, selection) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    let activeArray = todoArray.filter(todo => !todo.completed);
    document.getElementById('todo-count').innerHTML = `${activeArray.length} total`;

    if(activeArray.length === 0) todoList.innerHTML = 'All todos are completed...'
    else {
        for(let i=0; i< activeArray.length; i++) {
            const li = document.createElement('li');
            li.classList.add('item');
            const check = activeArray[i].completed ? 'checked' : 'unchecked';
            li.innerHTML = `<label for'${activeArray[i].id}'><input type='checkbox' id='${activeArray[i].id}' ${check}>${activeArray[i].content}</label>`;
            const button = document.createElement('button');
            button.classList.add('delete-btn');
            button.textContent = "X";

            // delete button event listener
            button.addEventListener('click', event => {
                todoArray = deleteTodo(todoArray, activeArray[i].id, event);
                saveList(todoArray);
                display(todoArray);
            });

            li.appendChild(button);
            todoList.appendChild(li);

            const label = li.firstElementChild;

            // checkmark event listener
            label.addEventListener('click', event => {
                addRemoveCheck(todoArray, activeArray[i].id, selection, event);
            });
        }
    }

}

export function displayCompletedList(todoArray, selection) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    let completedArray = todoArray.filter(todo => todo.completed);
    document.getElementById('todo-count').innerHTML = `${completedArray.length} total`;

    if(completedArray.length === 0) todoList.innerHTML = 'All todos are active...'
    else {
        for(let i=0; i< completedArray.length; i++) {
            const li = document.createElement('li');
            li.classList.add('item');
            const check = completedArray[i].completed ? 'checked' : 'unchecked';
            li.innerHTML = `<label for'${completedArray[i].id}'><input type='checkbox' id='${completedArray[i].id}' ${check}>${completedArray[i].content}</label>`;
            const button = document.createElement('button');
            button.classList.add('delete-btn');
            button.textContent = "X";

            // delete button event listener
            button.addEventListener('click', event => {
                todoArray = deleteTodo(todoArray, completedArray[i].id, event);
                saveList(todoArray);
                display(todoArray);
            });

            li.appendChild(button);
            todoList.appendChild(li);

            const label = li.firstElementChild;

            // checkmark event listener
            label.addEventListener('click', event => {
                addRemoveCheck(todoArray, completedArray[i].id, selection, event);
            });

            // strike through text and turn button red on hover
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

export function addRemoveCheck(todoArray, id, selection, event) {
    // stop event propogation
    event.preventDefault();
    const i = todoArray.findIndex(todo => todo.id === id);

    // check or uncheck manually
    if(event.target.firstElementChild.checked) {
        event.target.firstElementChild.checked = false;
        todoArray[i].completed = false;
    } else {
        event.target.firstElementChild.checked = true;
        todoArray[i].completed = true;
    }
    saveList(todoArray);
    display(todoArray, selection);
}