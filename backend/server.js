require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import the Express framework
const app = express(); // Create an instance of the Express application
const port = 3000; // Define the port number for the server to listen on
app.use(express.json());  // Middleware to parse incoming JSON requests
const cors = require('cors'); // Import the CORS middleware to handle cross-origin requests
app.use(cors()); // Enable CORS for all routes

const pool = require('./db'); // Import the database connection pool from db.js

// GET /api/tasks - Retrieve all tasks
app.get('/api/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks');
  res.json(result.rows);
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', async (req, res) => {
    if (!req.body || !req.body.task_name) {
        return res.status(400).json({ error: 'Task name is required' });
    }
    const result = await pool.query(
        'INSERT INTO tasks (task_name) VALUES ($1) RETURNING *',
        [req.body.task_name]
    );
    res.json(result.rows[0]);
});

// PUT /api/tasks/:id - Update a task by ID
app.put('/api/tasks/:id', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'No data provided' });
    }
    const task = await pool.query('SELECT * FROM tasks WHERE id = $1', [req.params.id]);
    if (task.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const result = await pool.query(
        'UPDATE tasks SET task_name = COALESCE($1, task_name), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
        [
        req.body.task_name || null, 
        req.body.completed !== undefined ? req.body.completed : null,
        req.params.id
    ]
    );
    res.json(result.rows[0]);
});

//Delete /api/tasks/completed - Delete all completed tasks
app.delete('/api/tasks/completed', async (req, res) => {
    const result = await pool.query('DELETE FROM tasks WHERE completed = true RETURNING *');
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'No completed tasks found' });
    }
    res.json({ message: 'Completed tasks deleted', count: result.rows.length });
});

// Delete /api/tasks/:id - Delete a task by ID
app.delete('/api/tasks/:id', async (req, res) => {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted', task: result.rows[0] });
});

// Start the server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});