
const todoListContainerEl = document.getElementById('todoListContainer');
let id = 0;
let defaultTodoList = [
    {
        id: id++,
        text: 'Learn HTML',
        isCompleted: false
    },
    {
        id: id++,
        text: 'Learn CSS',
        isCompleted: false
    },
    {
        id: id++,
        text: 'Learn JS',
        isCompleted: false
    }
];

todoList = localStorage.getItem('todoList') ?  JSON.parse(localStorage.getItem('todoList')) : localStorage.setItem('todoList', JSON.stringify(defaultTodoList));

saveTodoList = (todoList) => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

const deleteTodoItem = (todoId) => {
    const todoItemEl = document.getElementById(todoId);
    todoListContainerEl.removeChild(todoItemEl);
    todoList = todoList.filter((todoItem) => todoItem.id != todoId);
    saveTodoList(todoList);
}

const toggleIsCompleted = (todoId) => {
    const todoItem = todoList.find((todoItem) => todoItem.id == todoId);
    todoItem.isCompleted = !todoItem.isCompleted;
    const todoTextEl = document.getElementById(todoId).querySelector('.todo-text');
    todoTextEl.classList.toggle('todo-completed');
    saveTodoList(todoList);
}

const createTodoItem = (todoItem) => {
    const todoText = todoItem.text;
    const todoId = todoItem.id;
    const isCompleted = todoItem.isCompleted;

    const liEl = document.createElement('li');
    liEl.id = todoId;
    liEl.classList.add('todo-item-container', 'd-flex', 'flex-row', 'justify-content-between', 'align-items-center', 'border', 'border-dark-subtle');
    todoListContainerEl.appendChild(liEl);

    const inputTextContainerEl = document.createElement('div');
    inputTextContainerEl.classList.add('d-flex', 'flex-row', 'align-items-center', 'flex-grow-1', 'input-text-container');
    liEl.appendChild(inputTextContainerEl);

    const inputEl = document.createElement('input');
    inputEl.type = 'checkbox';
    inputEl.checked = isCompleted;
    inputEl.onchange = () => {toggleIsCompleted(todoId);}
    inputEl.classList.add('form-check-input', 'd-flex', 'flex-row');
    inputTextContainerEl.appendChild(inputEl);

    const todoTextEl = document.createElement('p');
    todoTextEl.textContent = todoText;
    todoTextEl.classList.add('todo-text');
    isCompleted ? todoTextEl.classList.add('todo-completed') : todoTextEl.classList.remove('todo-completed');
    inputTextContainerEl.appendChild(todoTextEl);

    const deleteIconEl = document.createElement('i');
    deleteIconEl.onclick = () => {deleteTodoItem(todoId);}
    deleteIconEl.classList.add('fa-solid', 'fa-trash');
    liEl.appendChild(deleteIconEl);
}

const addTodo = () => {
    const todoText = document.getElementById('todoInput').value;

    document.getElementById('todoInput').value = '';

    if(todoText.length == 0) { 
        alert("Todo cannot be Empty");
        return;
    }    

    const todoItem = {
        id: id++,
        text: todoText,
        isCompleted: false
    }

    createTodoItem(todoItem);
    todoList.push(todoItem);
    saveTodoList(todoList);
}

todoList.map((todoItem) => {
    createTodoItem(todoItem);
})
