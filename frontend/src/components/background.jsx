import bgDark from '../pictures/bg-desktop-dark.jpg';
import bgLight from '../pictures/bg-desktop-light.jpg';
import './background.css';
import TodoMenu from './todo_menu';

function Background({ isDarkMode }) {
  return (
    <>
      {/* Layer 1 - Background */}
      <div className="background">
        <div className="bg-image">
          <img src={isDarkMode ? bgDark : bgLight} className='image'/>
        </div>
        <div className="bg-fill" />
      </div>
    </>
  );
}

export default Background;