import '../styles/account.css';
import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import Settings from './insideTabs/Settings';
import Vacancies from './insideTabs/Vacancies';

const Account = ({ setSubmittedForm, setUser }) => {
  const [mode, setMode] = useState('top');

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

  return (
    <div className="account-page">
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
            children: <Vacancies />,
          },
          {
            label: <p className="tab-text">CV</p>,
            key: '2',
            children: 'test',
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
              <Settings setSubmittedForm={setSubmittedForm} setUser={setUser} />
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
    </div>
  );
};

export default Account;
