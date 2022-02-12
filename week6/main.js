import Todo from './todo.js';

const localStorageName = 'todoList';

let todoArray = [];

let selection = 'all';

loadList(selection);

// event listener to switch styles to dark mode
const themeButton = document.getElementById('theme-btn');
themeButton.addEventListener('click', () => {
    if(themeButton.innerHTML === 'Dark Mode') {
        document.getElementById('styles').setAttribute('href', 'dark.css');
        themeButton.innerHTML = 'Light Mode'
    } else {
        document.getElementById('styles').setAttribute('href', 'styles.css');
        themeButton.innerHTML = 'Dark Mode'
    }
});

// event listener to display all todos
document.getElementById('all-btn').addEventListener('click', () => {
    selection = 'all';
    loadList(selection);
});

// event listener to display active todos
document.getElementById('active-btn').addEventListener('click', () => {
    selection = 'active';
    loadList(selection);
});

// event listener to display completed todos
document.getElementById('completed-btn').addEventListener('click', () => {
    selection = 'completed';
    loadList(selection);
});

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

function deleteTodo(i, event) {
    event.preventDefault();
    todoArray.splice(i, 1);
    saveList();
}

function saveList() {
    localStorage.setItem(localStorageName, JSON.stringify(todoArray));
    loadList(selection);
}

function loadList(selection) {
    const savedTodoArray = JSON.parse(localStorage.getItem(localStorageName));
    if(savedTodoArray !== null) todoArray = savedTodoArray;
    if(todoArray.length !== 0) {
        if(selection === 'active') displayActiveList();
        else if(selection === 'completed') displayCompletedList();
        else displayList();
    }
}

function displayList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    document.getElementById('todo-count').innerHTML = `${todoArray.length} total`;
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
            addRemoveCheck(todoArray[i].id, event);
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

function displayActiveList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    let activeArray = todoArray.filter(todo => !todo.completed);
    document.getElementById('todo-count').innerHTML = `${activeArray.length} total`;

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
            deleteTodo(i, event);
        });

        li.appendChild(button);
        todoList.appendChild(li);

        const label = li.firstElementChild;

        // checkmark event listener
        label.addEventListener('click', event => {
            addRemoveCheck(activeArray[i].id, event);
        });
    }

}

function displayCompletedList() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    let completedArray = todoArray.filter(todo => todo.completed);
    document.getElementById('todo-count').innerHTML = `${completedArray.length} total`;

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
            deleteTodo(i, event);
        });

        li.appendChild(button);
        todoList.appendChild(li);

        const label = li.firstElementChild;

        // checkmark event listener
        label.addEventListener('click', event => {
            addRemoveCheck(completedArray[i].id, event);
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

function addRemoveCheck(id, event) {
    // stop event propogation
    event.preventDefault();

    const i = todoArray.findIndex(todo => todo.id === id);

    console.log(i);


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