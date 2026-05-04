import backgroundImageDark from '../pictures/bg-desktop-dark.jpg';
import backgroundImageLight from '../pictures/bg-desktop-light.jpg';
import './background.css';
import TodoMenu from './todo_menu';

function Background() {
  return (
    <>
        <div className="top">
            <img src={backgroundImageDark} className="backgroundTopImage"/>
            <TodoMenu />
        </div>
        <div className="bottom">
          
        </div>
    </>
  );
}

export default Background;