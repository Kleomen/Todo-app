import './task.css';
import { useState } from 'react';
import IconCheck from '../pictures/icon-check.svg';
import IconCross from '../pictures/icon-cross.svg';
import {useSortable} from '@dnd-kit/react/sortable';

function Task({ taskText, completed, onToggle, deleteTask, id, index }) {
    const {ref} = useSortable({
        id, 
        index,
        transition: {
            duration: 300,
            easing: 'ease',
        }
    });

    return (
        <div ref={ref} className="container_tasks">
            <div className="task">
                <div className="circle" onClick={onToggle}>
                    {completed && <img src={IconCheck}/>}
                </div>
                <p style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                    {taskText}
                </p>
                <button className="delete-btn" onClick={deleteTask}>
                    <img src={IconCross}/>
                </button>
            </div>
        </div>
    )
}

export default Task;