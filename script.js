// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when page loads
window.onload = () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
};

// Function to create a task list item
function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.onclick = () => {
        li.remove();
        updateLocalStorage();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Add new task
addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task !== '') {
        createTaskElement(task);
        updateLocalStorage();
        taskInput.value = '';
    }
});

// Update tasks in localStorage
function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
