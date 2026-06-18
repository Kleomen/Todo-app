import './todo_menu.css';
import moonIcon from '../pictures/icon-moon.svg'
import sunIcon from '../pictures/icon-sun.svg'
import Task from './task';
import { useState, useEffect } from 'react';
import {DragDropProvider} from '@dnd-kit/react';
import {useSortable} from '@dnd-kit/react/sortable';

function TodoMenu({ isDarkMode, onToggle }) {
    const [tasks,setTasks] = useState([]);
    const [inputText,setInputText] = useState('');
    const [view, setView] = useState("all");

    // Hook for loading the tasks on startup
    useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/api/tasks')
        .then(res => res.json())
        .then(data => setTasks(data));
    }, []);

    // Function to toggle the completed status of a task in the database and update the state
    const toggleCompleted = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ completed: !tasks.find(task => task.id === id).completed })
        });
        setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
    }
    // Function to update the task name in the database and update the state
    const onEdit = async (id, newName) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ task_name: newName })
        });
        setTasks(tasks.map(task => task.id === id ? {...task, task_name: newName} : task));
    }
    // Function to add a new task to the database and update the state
    const addTask = async (text) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ task_name: text })
        });
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
    }

    // Function to handle the Enter key press in the input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputText.trim() !== '') { 
            addTask(inputText)
            setInputText('');
        }
    };

    // Function to clear all completed tasks from the state
    const clearCompleted = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/completed`, {
            method: 'DELETE',
        });
        setTasks(tasks.filter(task => !task.completed));
    }

    // Function to delete a task from the database and update the state
    const deleteTask = async (id) => {
         const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: 'DELETE',
        });
        setTasks(tasks.filter(task => task.id !== id));
    }

    const handleDragEnd = (event) => {
        // if drag was cancelled, do nothing
        if (event.canceled) return;

        const {source} = event.operation;

        // get old and new positions
        const {initialIndex, index} = source;

        // only update if position actually changed
        if (initialIndex !== index) {
            setTasks((tasks) => {
                const newTasks = [...tasks];                    // copy the array
                const [removed] = newTasks.splice(initialIndex, 1);  // remove from old spot
                newTasks.splice(index, 0, removed);                  // insert at new spot
                return newTasks;                                     // return new array
            });
        }
    }
    return (
        <div className = "container_menu">
            <div className="top_menu">
                <h1 className='todo'>TODO</h1>
                <img
                    src={isDarkMode ? sunIcon : moonIcon}              
                    onClick={onToggle}
                    className="sun_moon_icon"
                />
            </div>
            <div className="search_bar">
                <input className="input_bar"
                    placeholder=' Add a new todo...' 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            
            {/*Create a task component for each task in the tasks array*/}
            <DragDropProvider onDragEnd={handleDragEnd}>
                <div className="task_list">
                    {tasks.filter(task => view === "all" ? task : view === "active" ? !task.completed : task.completed).map((task, index) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            index={index}
                            taskText={task.task_name}
                            completed={task.completed}
                            onToggle={() => toggleCompleted(task.id)}
                            deleteTask={() => deleteTask(task.id)}
                            onEdit= {(newName) => onEdit(task.id,newName)}                            
                        />
                    ))}
                </div>
            </DragDropProvider>

            {/* Footer menu */}
            <div className="footer_menu">
                <div>
                    <p>{tasks.filter(task => !task.completed).length} items left</p>
                </div>
                <div className="view_options">
                    <p className={view === "all" ? "selected" : ""} onClick={() => setView("all")} >All</p>
                    <p className={view === "active" ? "selected" : ""} onClick={() => setView("active")} >Active</p>
                    <p className={view === "completed" ? "selected" : ""} onClick={() => setView("completed")} >Completed</p>
                </div>
                <div className="clear_completed">
                    <p onClick={() => clearCompleted()}>Clear Completed</p>
                </div>
            </div>
            
        </div>
    )
}


export default TodoMenu;