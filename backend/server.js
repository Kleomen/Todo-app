const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


// GET /api/tasks - Retrieve all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: crypto.randomUUID(),
    task_name: req.body.task_name,
    completed: false,
  }
  tasks.push(newTask)
  res.json(newTask);
})

// PUT /api/tasks/:id - Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
   if (!req.body) {
    return res.status(400).json({ error: 'No data provided' });
  }
  if(req.body.task_name) {
    task.task_name = req.body.task_name;
  }
  if(req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }
  res.json(task);
})

//Delete /api/tasks/completed - Delete all completed tasks
app.delete('/api/tasks/completed', (req, res) => {
  let hadCompleted = tasks.some(t => t.completed);
  
  if (!hadCompleted) {
    return res.status(404).json({ error: 'No completed tasks found' });
  }

  tasks = tasks.filter(t => !t.completed);
  res.json({ message: 'Completed tasks deleted' });
});

// Delete /api/tasks/:id - Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(tasks.indexOf(task), 1);
  res.json({ message: 'Task deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});