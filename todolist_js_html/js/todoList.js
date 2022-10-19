export class ToDoList {
    constructor() {
        this.tdList = [];
    }
    addToDo(todo) {
        this.tdList.push(todo);
    }
    removeToDo(index) {
        this.tdList.splice(index, 1);
    }
    renderToDo() {
        let content = "";
        //Duyệt mảng từ phải qua trái (bắt đầu ở phần tử cuối mảng)
        content = this.tdList.reduceRight((tdContent, item, index) => {
            //tdContent = tdContent(noi dung cũ) + `nội dung mới`;
            tdContent += `
                <li>
                    <span>${item.id}</span>
                    <span>${item.textTodo}</span>
                    <div class="buttons">
                        <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteToDo(event)">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="${index}"  data-status="${item.status}" onclick="completeToDo(event)" >
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                        <button class="btn btn-primary" onclick="suaToDoList('${item.id}')" id="suaToDo">
                            Sửa
                        </button>
                    </div>
                </li>
            `;
            return tdContent;
        }, '');
        return content;
    }
 
    sortToDoList(isDES){
        this.tdList.sort((todo, nextToDo)=>{
            const textA = todo.textTodo.toLowerCase();
            const textB = nextToDo.textTodo.toLowerCase();
            //ASC
            return textB.localeCompare(textA);
        });
        if(isDES){
            this.tdList.reverse();
        }
    }
    // findItemTd(id){
    //     // var todo = ""
    //     // for(var indexLoop = 0; indexLoop < this.tdList.length;++indexLoop){
    //     //     if(Number(id) === this.tdList[indexLoop].id){
    //     //         todo = this.tdList[indexLoop]
    //     //         console.log(todo)
    //     //     } else{
    //     //         return;
    //     //     }
    //     // }
    //     return this.tdList
    // }
    
}