import './todo_menu.css';
import moonIcon from '../pictures/icon-moon.svg'
import sunIcon from '../pictures/icon-sun.svg'
import Task from './task';
import { useState,inputText } from 'react';

function TodoMenu({ isDarkMode, onToggle }) {
    const [tasks,setTasks] = useState([]);
    const [inputText,setInputText] = useState('');

    const toggleCompleted = (id) => {
        setTasks(tasks.map(task => 
            task.id === id 
            ? { ...task, completed: !task.completed }
            : task                                      
        ))
    }
    const addTask = (text) => {
        setTasks([...tasks, {
            id: crypto.randomUUID(), // or date.now() for a simpler unique ID
            task_name: text,
            project_name: "Default",
            priority: "low",
            due_date: null,
            completed: false,
        }])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputText.trim() !== '') { 
            addTask(inputText)
            setInputText('');
        }
    };

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
            {tasks.map((task) => (
                    <Task
                    key={task.id}
                    taskText={task.task_name}
                    completed={task.completed}
                    onToggle={() => toggleCompleted(task.id)} />
                    
            ))}

            <p>
                {tasks.filter(task => !task.completed).length} items left
            </p>
        </div>
    )
}

export default TodoMenu;