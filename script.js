document.addEventListener('DOMContentLoaded', loadTasks);

const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');

addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearAllTasks);

function addTask() {
    const taskText = input.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    createTaskElement(taskText);
    saveTaskToLocalStorage(taskText);
    input.value = '';
}

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '❌';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
}

taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const task = e.target.parentElement;
        removeTaskFromLocalStorage(task.textContent.replace('❌', '').trim());
        task.remove();
    } else if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    }
});

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        createTaskElement(task);
    });
}

function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllTasks() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}
