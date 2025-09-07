const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Helper functions
function readTasks() {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// Routes
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const tasks = readTasks();
    const newTask = { id: Date.now(), text: req.body.text };
    tasks.push(newTask);
    writeTasks(tasks);
    res.json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    let tasks = readTasks();
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    writeTasks(tasks);
    res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
