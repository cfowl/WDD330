const localStorageName = 'todoList';
let todoArray = [];

export function saveList(todoArray) {
    localStorage.setItem(localStorageName, JSON.stringify(todoArray));
    loadList();
}

export function loadList() {
    const savedTodoArray = JSON.parse(localStorage.getItem(localStorageName));
    if(savedTodoArray !== null) todoArray = savedTodoArray;
    
    return todoArray;
}