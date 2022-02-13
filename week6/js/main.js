import Todo, {getNewTodo} from './todo.js';
import {saveList, loadList} from './ls.js';
import {display} from './utilities.js';


const allButton = document.getElementById('all-btn');
const activeButton = document.getElementById('active-btn');
const completedButton = document.getElementById('completed-btn');
let todoArray = loadList();
display(todoArray, 'all');

// event listener to switch styles to dark mode
const themeButton = document.getElementById('theme-btn');
themeButton.addEventListener('click', () => {
    if(themeButton.innerHTML === 'Dark Mode') {
        document.getElementById('styles').setAttribute('href', './css/dark.css');
        themeButton.innerHTML = 'Light Mode'
    } else {
        document.getElementById('styles').setAttribute('href', './css/styles.css');
        themeButton.innerHTML = 'Dark Mode'
    }
});

// event listener to display all todos
allButton.addEventListener('click', () => {
    if(!allButton.classList.contains('active')) {
        allButton.classList.add('active');
        activeButton.classList.remove('active');
        completedButton.classList.remove('active');
    }
    todoArray = loadList();
    display(todoArray, 'all');
});

// event listener to display active todos
activeButton.addEventListener('click', () => {
    if(!activeButton.classList.contains('active')) {
        allButton.classList.remove('active');
        activeButton.classList.add('active');
        completedButton.classList.remove('active');
    }
    todoArray = loadList();
    display(todoArray, 'active');
});

// event listener to display completed todos
completedButton.addEventListener('click', () => {
    if(!completedButton.classList.contains('active')) {
        allButton.classList.remove('active');
        activeButton.classList.remove('active');
        completedButton.classList.add('active');
    }
    todoArray = loadList();
    display(todoArray, 'completed');
});

// event listener to add new todo
document.forms['add-todo'].addEventListener('submit', event => {
    const todo = getNewTodo(event);
    todoArray = loadList();
    todoArray.push(todo);
    saveList(todoArray);
    display(todoArray);
});