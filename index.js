
// !SELECTOR

const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-btn");
const todoList=document.querySelector(".todolist");
const filterOption=document.querySelector(".filter-todo");

// !EVENT LISTENER

todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",checkRemove);
filterOption.addEventListener("click",filterTodo);
document.addEventListener("DOMContentLoaded",getLocalTodos);


// !FUNCTION ADDTODO

function addTodo(e){
    e.preventDefault();
    // console.log(e);

    // !create div

    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    // !create todo item

    const newTodo=`
    <li>${todoInput.value}</li>
    <span><i class="fas fa-check-square"></i></span>
    <span><i class="fas fa-trash-alt"></i></span> `;
     todoDiv.innerHTML=newTodo;

//  !append to todolist

    todoList.appendChild(todoDiv);

    // !LOCALSTORAGE SAVE
    savedLocalTodos(todoInput.value);

    // !clear input

    todoInput.value="";
}

// !FUNCTION CHECKREMOVE

function checkRemove(e){
    // console.log(e
    // console.log(e.target.classList);
    const classList=[...e.target.classList];
    // console.log(classList);
    const item=e.target;
    // console.log(item.parentElement.parentElement);
  if(classList[1]==="fa-check-square"){
    const todo=item.parentElement.parentElement;
    todo.classList.toggle('completed');

  }else if(classList[1]==="fa-trash-alt"){
    
    const todo=item.parentElement.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
}

// !FUNCTION FILTERTODO

function filterTodo(e){
    // console.log(e.target.value);
    // console.log(todoList.childNodes);
    const todos=[...todoList.childNodes];
    // console.log(todos);
    todos.forEach((todo)=>{
        switch(e.target.value){
            case 'all':
                todo.style.display="flex";
                break;
                case 'completed':
                    if(todo.classList.contains("completed")){
                        todo.style.display="flex";
                    }
                    else{todo.style.display="none";
                }
                break;
                case 'uncompleted':
                    if(!todo.classList.contains("completed")){
                        todo.style.display="flex";
                    }
                    else{ todo.style.display="none";
                }
                break;
        }
    });
}

// !LOCAL STORAGE

// !FUNCTION SAVEDLOCALTODOS

function savedLocalTodos(todo){
    let savedTodos=localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos"))
    :[];
    savedTodos.push(todo);
    localStorage.setItem('todos',JSON.stringify(savedTodos));
}

// !FUNCTION GETLOCALTODOS

function getLocalTodos(){
    let savedTodos=localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos"))
    :[];
    savedTodos.forEach((todo)=>{

        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo=`
        <li>${todo}</li>
        <span><i class="fas fa-check-square"></i></span>
        <span><i class="fas fa-trash-alt"></i></span> `;
         todoDiv.innerHTML=newTodo;
         todoList.appendChild(todoDiv);

    });  
}

// !FUNCTION REMOVELOCALTODOS

function removeLocalTodos(todo){
    // console.log(todo.children[0].innerText);
    let savedTodos=localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos"))
    :[];
    
    const filtereTodos=savedTodos.filter((t)=>
    t!==todo.children[0].innerText
    );
    localStorage.setItem('todos',JSON.stringify(filtereTodos));

}











