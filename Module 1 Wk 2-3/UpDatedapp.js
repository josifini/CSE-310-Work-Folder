let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(taskText, isHighPriority = false) {
    if (taskText === '') return;

    let task = { id: Date.now(), content: taskText, completed: false, highPriority: isHighPriority };
    tasks.push(task);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.textContent = task.content;
        li.id = task.id;
        li.className = task.completed ? 'completed' : '';
        li.style.color = task.highPriority ? 'red' : 'black';

        // Toggle completion on click
        li.onclick = function() { toggleTaskCompletion(task.id); };

        // Create a delete button for each task
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function(event) {
            event.stopPropagation(); // Prevents the li onclick event
            removeTask(task.id);
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(taskId) {
    let task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function editTask(taskId) {
    let task = tasks.find(t => t.id === taskId);
    let newContent = prompt('Edit your task', task.content);
    if (newContent !== null) {
        task.content = newContent;
        saveTasks();
        renderTasks();
    }
}

function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function addTaskFromInput() {
    let taskInput = document.getElementById('taskInput');
    let isHighPriority = document.getElementById('highPriority').checked;
    addTask(taskInput.value.trim(), isHighPriority);
    taskInput.value = '';
    document.getElementById('highPriority').checked = false;
}

window.onload = renderTasks;
