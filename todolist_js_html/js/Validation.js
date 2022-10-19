

var validation = {
   
    kiemTraRong: function (value,errId,name) {
        //Nếu không hợp lệ thì hàm này return về false ngược lại return về true
        if(value.trim() === '') {
            document.getElementById(errId).style.display='block';
            document.getElementById(errId).innerHTML = `${name} không được bỏ trống !`;
            return false;
        }

        document.getElementById(errId).style.display='none';
        return true;
    },
    kiemTraTrungLap1: function(value,errId){
        
        for(var i = 0; i < window.todoList1.tdList.length;i++){
           
            if(value.trim() === window.todoList1.tdList[i].textTodo.trim()){
            document.getElementById(errId).style.display='block';
            document.getElementById(errId).innerHTML = 'Task bị trùng!';
            return false;
            
            
            }
            
        }
        document.getElementById(errId).style.display='none';
        return true;
    },
    kiemTraTrungLap2: function(value,errId){
        
        for(var i = 0; i < window.todoList2.tdList.length;i++){
           
            if(value.trim() === window.todoList2.tdList[i].textTodo.trim()){
            document.getElementById(errId).style.display='block';
            document.getElementById(errId).innerHTML = 'Task bị trùng!';
            return false;
            
            
            }
            
        }
        document.getElementById(errId).style.display='none';
        return true;
    }
}