import { NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import { Avatar, Badge, Space } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  SolutionOutlined,
  MenuOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import './styles/menu.css';
import axios from 'axios';
import './styles/menu.css';

const NavMenu = ({ user, setUser, setIsLoggedIn }) => {
  const [usersNumber, setUsersNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const countUsers = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/count-users`)
        .then((response) => {
          setUsersNumber(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    countUsers();
  }, []);

  const handleLogout = () => {
    document.cookie =
      'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    setUser(null);
    setOpen(false);
  };
  return (
    <>
      <div className="top-menu">
        <div className="top-menu-item">
          <h3>{usersNumber.total}</h3>
          <p>All Users</p>
        </div>
        <div className="top-menu-item">
          <h3>{usersNumber.seamen}</h3>
          <p>Seamen</p>
        </div>
        <div className="top-menu-item">
          <h3>{usersNumber.employers}</h3>
          <p>Employers</p>
        </div>
      </div>
      <nav id="sticky">
        <div className="nav-container">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>CREWBOARD</h1>
            </Link>
          </div>
          <div className="navlinks">
            <NavLink to="/vacancies">
              {' '}
              <UnorderedListOutlined /> Vacancies
            </NavLink>
            <NavLink to="/seafarers">
              {' '}
              <SolutionOutlined /> Seafarers
            </NavLink>
            <NavLink to="/companies">
              {' '}
              <GlobalOutlined /> Companies
            </NavLink>
            {!user ? (
              <>
                <NavLink to="/registration">
                  {' '}
                  <UserAddOutlined /> Registration
                </NavLink>
                <NavLink to="/login">
                  {' '}
                  <LoginOutlined /> Login
                </NavLink>
              </>
            ) : (
              <>
                <Link to="/account">
                  <Space size={24}>
                    <Badge count={1}>
                      <Avatar
                        shape="square"
                        icon={
                          user.logoUrl ? (
                            <img src={user.logoUrl} alt="Logo" />
                          ) : (
                            <UserOutlined />
                          )
                        }
                      />
                    </Badge>
                  </Space>{' '}
                </Link>
                <Link to="/" onClick={handleLogout}>
                  {' '}
                  <LogoutOutlined /> Logout
                </Link>
              </>
            )}
          </div>
          <div className="menu-button-wrapper">
            <Button
              className="menu-button"
              type="default"
              ghost
              onClick={showDrawer}
            >
              <MenuOutlined />
            </Button>
            <Drawer
              title="CREWBOARD"
              placement="left"
              onClose={onClose}
              open={open}
            >
              <div className="drawer-menu">
                <div className="login-reg ">
                  {!user ? (
                    <>
                      <NavLink to="/registration" onClick={onClose}>
                        {' '}
                        <UserAddOutlined /> Registration
                      </NavLink>
                      <NavLink to="/login" onClick={onClose}>
                        {' '}
                        <LoginOutlined /> Login
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <div>
                        <Link to="/account" onClick={onClose}>
                          <Space size={24}>
                            <Badge count={1}>
                              <Avatar
                                shape="square"
                                icon={
                                  user.logoUrl ? (
                                    <img src={user.logoUrl} alt="Logo" />
                                  ) : (
                                    <UserOutlined />
                                  )
                                }
                              />
                            </Badge>
                          </Space>{' '}
                        </Link>
                        <NavLink to="/account" onClick={onClose}>
                          {' '}
                          Account
                        </NavLink>
                      </div>
                      <Link to="/" onClick={handleLogout}>
                        {' '}
                        <LogoutOutlined /> Logout
                      </Link>
                    </>
                  )}
                </div>
                <div className="navlinks-in-drower">
                  <NavLink to="/" onClick={onClose}>
                    {' '}
                    <HomeOutlined /> Home
                  </NavLink>
                  <NavLink to="/vacancies" onClick={onClose}>
                    {' '}
                    <UnorderedListOutlined /> Vacancies
                  </NavLink>
                  <NavLink to="/seafarers" onClick={onClose}>
                    {' '}
                    <SolutionOutlined /> Seafarers
                  </NavLink>
                  <NavLink to="/companies" onClick={onClose}>
                    {' '}
                    <GlobalOutlined /> Companies
                  </NavLink>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavMenu;
