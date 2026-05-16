import './task.css';

function Task({ taskText }) {
    return (
        <div className = "container_tasks">
            <div className="task">
                <div className="circle"></div>
                <p>{taskText}</p>
            </div>
        </div>
    )
}

export default Task;