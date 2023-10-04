import { Outlet } from 'react-router-dom';
import Navmenu from './NavMenu';
import Footer from './Footer';
import './styles/menu.css';

const MainLayOut = ({ user, setUser, setIsLoggedIn, countVacancies }) => {
  return (
    <div className="container-main">
      <Navmenu
        user={user}
        setUser={setUser}
        setIsLoggedIn={setIsLoggedIn}
        countVacancies={countVacancies}
      />

      <div className="container-outlet">
        <Outlet />
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};
export default MainLayOut;
