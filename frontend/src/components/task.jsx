import './task.css';
import { useState } from 'react';
import IconCheck from '../pictures/icon-check.svg';
import IconCross from '../pictures/icon-cross.svg';
import {useSortable} from '@dnd-kit/react/sortable';

function Task({ taskText, completed, onToggle, deleteTask, id, index, onEdit }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText,setEditText] = useState(taskText)

    const {ref} = useSortable({
        id, 
        index,
        transition: {
            duration: 300,
            easing: 'ease',
        }
    });

    // Function to handle the Enter key press in the input field
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && editText.trim() !== '') {   
            onEdit(editText)            
            setIsEditing(false)
        }
    };

    return (
        <div ref={ref} className="container_tasks">
            <div className="task">
                <div className="circle" onClick={onToggle}>
                    {completed && <img src={IconCheck}/>}
                </div>
                {isEditing ?
                    // show input when editing
                    <input                         
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}                        
                        onKeyDown={handleKeyDown}
                    />
                    :
                    // show text when not editing
                    <p onClick={() => setIsEditing(true)} style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                        {taskText}
                    </p>
                }
                <button className="delete-btn" onClick={deleteTask}>
                    <img src={IconCross}/>
                </button>
            </div>
        </div>
    )
}

export default Task;