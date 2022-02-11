export default class Todo {
    constructor() {
        this.id = new Date().getTime();
        this.content = '';
        this.completed = false;
        this.delete = this.getDeleteButton();
    }

    getDeleteButton() {
        const btn = document.createElement('button');
        btn.innerHTML = 'X';
        btn.id = 'deleteTodo'
        btn.addEventListener('click', event => {
            event.preventDefault();
            console.log('Delete: ' + this.content);
        });
        return btn;
    }
}