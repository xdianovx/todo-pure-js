//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions


function addTodo(event) {
    event.preventDefault()

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item')
    newTodo.innerHTML = todoInput.value

    todoDiv.appendChild(newTodo)
    //add to local storage
    saveToLocalStorage(todoInput.value)

    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add('complete-btn')
    todoDiv.appendChild(completeButton)

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] == 'trash-btn') {
        let todo = item.parentElement;
        todo.classList.add('fall')
        removeLocalStorageTodos(todo)
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })

    }

    if (item.classList[0] == 'complete-btn') {
        let todo = item.parentElement;
        todo.classList.toggle('completed');

    }
}

function filterTodo(e) {

    const todos = todoList.childNodes;

    todos.forEach((todo) => {
        console.log(todo);


        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                console.log(1);
                break;

            case "completed":
                console.log(2);
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

            case "uncompleted":
                console.log(3);
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;


        }

    })
}

console.log(localStorage);

function saveToLocalStorage(todo) {

    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))

}

function getTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item')
        newTodo.innerHTML = todo
        todoDiv.appendChild(newTodo)

        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add('complete-btn')
        todoDiv.appendChild(completeButton)

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        todoList.appendChild(todoDiv)
    })

}

function removeLocalStorageTodos(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText
    console.log(todos.splice(todos.indexOf(todoIndex), 1));

    localStorage.setItem('todos', JSON.stringify(todos))
}
