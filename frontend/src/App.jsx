import Background from './components/background';
import TodoMenu from './components/todo_menu';
import './App.css';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
  <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
    <Background isDarkMode={isDarkMode} />
    <TodoMenu isDarkMode={isDarkMode} onToggle={toggleTheme} />
    <div className="footer_menu">
      <p>Drag and drop to reorder list</p>
    </div>
  </div >
  );
}

export default App;