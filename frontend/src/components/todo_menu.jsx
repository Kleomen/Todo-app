import './todo_menu.css';
import moonIcon from '../pictures/icon-moon.svg'
import sunIcon from '../pictures/icon-sun.svg'
import Task from './task';
import { useState,inputText } from 'react';

function TodoMenu({ isDarkMode, onToggle }) {
    const [tasks,setTasks] = useState([]);
    const [inputText,setInputText] = useState('');
    const [view, setView] = useState("all");

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
            {tasks.filter(task => view === "all" ? task : view === "active" ? !task.completed : task.completed).map((task) => (
                    <Task
                    key={task.id}
                    taskText={task.task_name}
                    completed={task.completed}
                    onToggle={() => toggleCompleted(task.id)} />
                    
            ))}

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
                <div>
                    <p onClick={() => setTasks(tasks.filter(task => !task.completed))}>Clear Completed</p>
                </div>
            </div>
            
        </div>
    )
}


export default TodoMenu;