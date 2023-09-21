const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const todoList = document.getElementById('todoList');

addTaskButton.addEventListener('click', function() {
    if (taskInput.value.trim() !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = taskInput.value.trim();
        listItem.addEventListener('click', toggleCompletion);
        listItem.addEventListener('contextmenu', removeTask);
        
        todoList.appendChild(listItem);
        taskInput.value = '';
    }
});

function toggleCompletion(event) {
    const li = event.currentTarget;
    if (li.classList.contains('completed')) {
        li.classList.remove('completed');
    } else {
        li.classList.add('completed');
    }
}

function removeTask(event) {
    event.preventDefault();
    const li = event.currentTarget;
    li.removeEventListener('click', toggleCompletion);
    li.removeEventListener('contextmenu', removeTask);
    li.remove();
}
