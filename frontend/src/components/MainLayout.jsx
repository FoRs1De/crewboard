import { Outlet } from 'react-router-dom';
import Navmenu from './NavMenu';
import Footer from './Footer';
import './styles/menu.css';

const MainLayOut = ({ user, setUser }) => {
  return (
    <div className="container-main">
      <Navmenu user={user} setUser={setUser} />
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
