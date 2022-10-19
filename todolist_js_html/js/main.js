//Import lớp đối tượng
import {ToDo} from "./todo.js";
import {ToDoList} from "./todoList.js";

let todoList = new ToDoList();
let todoList2 = new ToDoList();
var updateId = 0;
let completeList = new ToDoList();
window.todoList1 = todoList
window.todoList2 = completeList
//nhu vay em hieu ko, vay bay gio em mun import qua ben validation thi cung lam v ha anh , dung r nhe , a test cho xem
//vay em luu len window la duoc
//Hàm rút gọn cú pháp getElementById
const getELE = id =>{
    return document.getElementById(id);
}

//Hàm thêm todo
const addToDo = () =>{
    let txtToDo = getELE("newTask").value;
    let ulToDo = getELE("todo");
    var valid = true
    
    valid = validation.kiemTraRong(txtToDo,'notiInput','Task') & validation.kiemTraTrungLap1(txtToDo,'notiDuplicateInput') & validation.kiemTraTrungLap2(txtToDo,'notiDuplicateInput')
    
    if(!valid){
        return;
    }
    let td = new ToDo(txtToDo,"todo");
    todoList.addToDo(td);
    //o dau em
    //gọi hàm
    showToDoList(ulToDo);

    getELE("newTask").value = "";
    setLocalStorageToDo()
}

getELE("addItem").addEventListener("click",()=>{
    
    addToDo();
    
});

//Hàm hiển thị todo
//Khai báo hàm
//Hàm Tìm Kiếm theo ID
document.getElementById('btnTimKiem').onclick = function(){
    
    var id = document.getElementById('todoID').value
    id = id.trim()
    console.log('id',id)
    var ulketQua = document.getElementById('taskFind')
    // // console.log("ulketqua",ulketQua)
    
    // // var td = todoList.findItemTd(id)
    // // console.log(td)
    // // todoList2.addToDo(td)
    var td = todoList.tdList.find(x => x.id == id);
    todoList2.addToDo(td)
    showSearchToDo(ulketQua)
    // for(var i =0; i<todoList.tdList.length;++i){
    //     if(id === todoList.tdList[i].id){
    //         var todo = todoList.tdList[i]
    //         break
    //     }
    // }
    // todoList2.addToDo(todo)
    // showSearchToDo(ulketQua)
}


// }
const suaToDoList = (idClick)=>{
    
    // var indexEdit = -1
    // var todo = ""
    // for(var index = 0; index<todoList.tdList.length; ++index){
    //     console.log(todoList.tdList[index])
    //     todo = todoList.tdList[index]
    //     if(Number(idClick) === todo.id){
    //         indexEdit = index
    //         updateId = idClick;
    //         break
    //     }
    // }
    // if(indexEdit!=-1){
    //     document.getElementById('newTask').value = todoList.tdList[indexEdit].textTodo
    //     console.log(todoList.tdList[indexEdit].textTodo)
    // }
    let item = todoList.tdList.find(x => x.id == idClick);
    document.getElementById('newTask').value = item.textTodo;
    updateId  = item.id;
}

window.suaToDoList = suaToDoList;
document.getElementById('updateItem').onclick = function(){
    let txtToDo = getELE("newTask").value;
    let tmp = todoList.tdList.find(x => x.id == updateId);
    let ulToDo = getELE("todo");
    tmp.textTodo = txtToDo;
    updateId = "";
    // for(var i = 0; i<todoList.tdList.length;++index){
    //     if(Number(idClick) === todo.id){
    //         indexEdit = index
    //         updateId = idClick;
    //         break
    //     }
    // }
    
    showToDoList(ulToDo)
    console.log(todoList.tdList)
    setLocalStorageToDo()
}


const showToDoList = (ulToDo)=>{
    ulToDo.innerHTML = todoList.renderToDo();
}
const showSearchToDo = (ulketQua) =>{
    ulketQua.innerHTML = todoList2.renderToDo()
}

const showCompleteList = (ulCompleted)=>{
    ulCompleted.innerHTML = completeList.renderToDo();
}
//Hàm delete todo
const deleteToDo = (e)=>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getELE("todo");
    let ulCompleted =  getELE("completed");
    if(status == "todo"){
        todoList.removeToDo(tdIndex);
        showToDoList(ulToDo);
        setLocalStorageToDo()
    }else if(status == "completed"){
        completeList.removeToDo(tdIndex);
        showCompleteList(ulCompleted);
        
        setLocalStorageCompleted();
    }else{
        alert("Cannot delete todo!");
    }
    

}

window.deleteToDo = deleteToDo;

const completeToDo = (e)=>{ 
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getELE("todo");
    let ulCompleted =  getELE("completed");
    
    if(status == "todo"){       
        // slice: start <=index <end
        let completedItem = todoList.tdList.slice(tdIndex,tdIndex+1);      
        let objToDo = new ToDo(completedItem[0].textTodo,"completed"); 
        moveToDo(todoList,completeList,objToDo,tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
        setLocalStorageToDo()
        setLocalStorageCompleted();
        
    }else if(status == "completed"){
        let undoItem = completeList.tdList.slice(tdIndex,tdIndex+1);      
        let objToDo = new ToDo(undoItem[0].textTodo,"todo");
        moveToDo(completeList,todoList,objToDo,tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
        setLocalStorageToDo()
        setLocalStorageCompleted();
    }else{
        alert("Cannot move todo !");
    }
    
}

window.completeToDo = completeToDo;

const moveToDo = (depart,arrival,obj,tdIndex)=>{
    //Remove todo from depart
    depart.removeToDo(tdIndex);

    //Add todo to arrival
    arrival.addToDo(obj);

}


const sortASC = ()=>{
    let ulToDo = getELE("todo");
    todoList.sortToDoList(false);
    showToDoList(ulToDo);
}

window.sortASC = sortASC;

const sortDES = ()=>{
    let ulToDo = getELE("todo");
    todoList.sortToDoList(true);
    showToDoList(ulToDo);
}

window.sortDES = sortDES;
function setLocalStorageToDo(){
    var stringtodoList = JSON.stringify(todoList.tdList);
    console.log(stringtodoList);
    //Lưu
    localStorage.setItem('todoList', stringtodoList);
    setCookie('todoList', stringtodoList, 5)
}
function setLocalStorageCompleted(){
    var stringComplete = JSON.stringify(completeList.tdList);
    console.log(stringComplete );
    //Lưu
    localStorage.setItem('completeList', stringComplete );
    setCookie('completeList', stringComplete , 5)
}
function getLocalStorage(){
    
    if(localStorage.getItem('todoList')){
        let stringtodoList = localStorage.getItem('todoList')
        var ulToDo = getELE('todo');
        todoList.tdList = JSON.parse(stringtodoList)
        showToDoList(ulToDo)
       
    }
    if(localStorage.getItem('completeList')){
        let stringComplete = localStorage.getItem('completeList')
        console.log(stringComplete)
        let ulCompleted = document.getElementById('completed')
        completeList.tdList = JSON.parse(stringComplete)
        showCompleteList(ulCompleted)
    }
}

getLocalStorage()
// function getLocalStorageComplete(){
//     console.log(localStorage.getItem('completeList'))
    
// }
// getLocalStorageComplete()



function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}