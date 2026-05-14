import './todo_menu.css';
import moonIcon from '../pictures/icon-moon.svg'
import sunIcon from '../pictures/icon-sun.svg'

function TodoMenu({ isDarkMode, onToggle }) {
    return (
        <div className = "container_menu">
            <div className="footer_menu">
                <h1 className='todo'>TODO</h1>
                <img
                    src={isDarkMode ? moonIcon : sunIcon}                    
                    onClick={onToggle}
                    className="sun_moon_icon"
                />
            </div>
        </div>
    )
}

export default TodoMenu;