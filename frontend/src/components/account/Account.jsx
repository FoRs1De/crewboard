import '../styles/account.css';
import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Settings from './insideTabs/Settings';
import UserVacancies from './insideTabs/UserVacancies';
import EmployerData from './insideTabs/EmployerData';
import axios from 'axios';

const Account = ({ setSubmittedForm, setUser, user, setIsloggedIn }) => {
  const [mode, setMode] = useState('top');
  const [vacancies, setVacancies] = useState([]);
  const [vacanyPosted, setVacancyPosted] = useState(false);

  function handleScreenWidthChange() {
    // Get the current screen width
    const screenWidth = window.innerWidth;

    // Check the screen width and perform actions based on it
    if (screenWidth >= 768) {
      setMode('top');
    } else {
      setMode('left');
    }
  }
  useEffect(() => {
    window.addEventListener('resize', handleScreenWidthChange);
    handleScreenWidthChange();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.user === 'seaman') {
        const getSeamanVacancies = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/seaman-vacancies`
            );

            setVacancies(response.data.reverse());
          } catch (error) {
            console.log(error.message);
          }
        };
        getSeamanVacancies();
      } else {
        const getEmployerVacancies = async () => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/user-vacancies`
            );
            console.log(response.data);
            setVacancies(response.data.reverse());
          } catch (error) {
            console.log(error.message);
          }
        };

        getEmployerVacancies();
      }
    }
  }, [vacanyPosted, user]);

  return (
    <div className="account-page">
      {user && (
        <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{
            height: 100 + '%',
          }}
          items={[
            {
              label: <p className="tab-text">Vacancies</p>,
              key: '1',
              children: (
                <UserVacancies
                  user={user}
                  vacancies={vacancies}
                  setVacancyPosted={setVacancyPosted}
                  setSubmittedForm={setSubmittedForm}
                />
              ),
            },
            user.user === 'seaman'
              ? {
                  label: <p className="tab-text">CV</p>,
                  key: '2',
                  children: 'test',
                }
              : {
                  label: <p className="tab-text">My Data</p>,
                  key: '2',
                  children: (
                    <EmployerData
                      user={user}
                      setSubmittedForm={setSubmittedForm}
                    />
                  ),
                },
            {
              label: <p className="tab-text">Messages</p>,
              key: '3',
              children: 'test',
            },
            {
              label: <p className="tab-text">Settings</p>,
              key: '4',
              children: (
                <Settings
                  setSubmittedForm={setSubmittedForm}
                  setUser={setUser}
                  setIsloggedIn={setIsloggedIn}
                />
              ),
            },
            {
              label: <p className="tab-text">Summary</p>,
              key: '5',
              children: 'test',
            },
            {
              label: <p className="tab-text">Feedback</p>,
              key: '6',
              children: 'test',
            },
          ]}
        />
      )}
    </div>
  );
};

export default Account;
