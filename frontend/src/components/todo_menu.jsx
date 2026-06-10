import './todo_menu.css';
import moonIcon from '../pictures/icon-moon.svg'
import sunIcon from '../pictures/icon-sun.svg'
import Task from './task';
import { useState } from 'react';
import {DragDropProvider} from '@dnd-kit/react';
import {useSortable} from '@dnd-kit/react/sortable';

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

    const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
    }

    const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
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