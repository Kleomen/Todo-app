import './todo_menu.css';
import moonIcon from '../pictures/icon-moon.svg'
import sunIcon from '../pictures/icon-sun.svg'
import Task from './task';
import { useState,inputText } from 'react';

function TodoMenu({ isDarkMode, onToggle }) {
    const [tasks, setTasks] = useState([]);
    const [inputText, setInputText] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputText.trim() !== '') {
            const newTask = {
            text: inputText,
            completed: false
            };

            setTasks([...tasks, newTask]);
            setInputText('');
        }
        };
    return (
        <div className = "container_menu">
            <div className="footer_menu">
                <h1 className='todo'>TODO</h1>
                <img
                    src={isDarkMode ? sunIcon : moonIcon}              
                    onClick={onToggle}
                    className="sun_moon_icon"
                />
            </div>
            <div className="search_bar">
                <input placeholder=' Add a new todo...' 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    />
            </div>

            <div className="tasks_container">
                {tasks.map((task) => (
                    <Task key={task.id} taskText={task.text} />
                ))}
            </div>
        </div>
    )
}

export default TodoMenu;