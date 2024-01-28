// Predefined tasks
let predefinedTasks = ['Learn JavaScript', 'Read a book', 'Go for a walk'];

function addTask(taskText) {
    try {
        if (taskText === '') {
            throw new Error('Task cannot be empty');
        }

        let taskList = document.getElementById('taskList');
        let li = document.createElement('li');
        li.textContent = taskText;

        // Create a delete button for each task
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            li.remove();
        };

        li.appendChild(deleteBtn);
        li.onclick = function(event) {
            if (event.target !== deleteBtn) {
                toggleTaskCompletion(li);
            }
        };

        taskList.appendChild(li);
    } catch (error) {
        alert(error.message);
    }
}

function addTaskFromInput() {
    let taskInput = document.getElementById('taskInput');
    addTask(taskInput.value.trim());
    taskInput.value = ''; // Clear the input field after adding
}

function toggleTaskCompletion(taskItem) {
    taskItem.classList.toggle('completed');
}

function initializeTasks() {
    predefinedTasks.forEach(task => addTask(task));
}

// Call initializeTasks when the window loads
window.onload = initializeTasks;
