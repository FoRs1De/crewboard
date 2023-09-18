import { Outlet } from 'react-router-dom';
import Navmenu from './NavMenu';
import Footer from './Footer';
import './styles/menu.css';

const MainLayOut = ({ user, setUser, setIsLoggedIn }) => {
  return (
    <div className="container-main">
      <Navmenu user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default MainLayOut;
