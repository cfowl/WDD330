export default class Todo {
    constructor() {
        this.id = new Date().getTime();
        this.content = '';
        this.completed = false;
    }
}

export function getNewTodo(event) {
    event.preventDefault();
    const input = document.forms['addTodo']['newContent'];
    const newContent = input.value;
    input.value = '';
    const todo = new Todo();
    todo.content = newContent;

    return todo;
}

export function deleteTodo(todoArray, id, event) {
    event.preventDefault();
    const i = todoArray.findIndex(todo => todo.id === id);
    todoArray.splice(i, 1);

    return todoArray;
}