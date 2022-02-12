export default class Todo {
    constructor() {
        this.id = new Date().getTime();
        this.content = '';
        this.completed = false;
    }
}