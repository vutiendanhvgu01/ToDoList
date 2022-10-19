export class ToDo{
    
    constructor(_txtTodo,_status){
        this.id = Math.floor(Math.random() * 10)
        this.textTodo = _txtTodo;
        //status: todo, completed
        this.status = _status;
    }
}