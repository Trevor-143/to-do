const form = document.getElementById('form');
const input = document.getElementById('input'); 
const todosUL = document.getElementById('todos'); 
const todos = JSON.parse(localStorage.getItem('todos'));


let todoNum = 0;

if(todos) {
    todos.forEach(todo => {
        addTodo(todo)
        updateLS();
    });
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    updateLS();
});

function addTodo(todo) {
    todoNum ++;
    let todoText = todoNum + " " + input.value;

    if(todo) {
        todoText = todo.text;
        updateLS();
    }


    if(todoText){
        const todoEl = document.createElement("li");

        if(todo  && todo.completed) {
            todoEl.classList.add('completed');
            updateLS();
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');

            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = '';
        
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        }); 
    });

    localStorage.setItem("todo", JSON.stringify(todos));
}