import './task.css';
import { useState } from 'react';
import IconCheck from '../pictures/icon-check.svg';

function Task({ taskText, completed, onToggle, isDarkMode }) {
    return (
        <div className="container_tasks">
            <div className={`task ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="circle" onClick={onToggle}>
                    {completed && <img src={IconCheck}/>}
                </div>
                <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                    {taskText}
                </p>
            </div>
        </div>
    )
}

export default Task;