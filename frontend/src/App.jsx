import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import './App.css';
import MainLayOut from './components/MainLayout';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Vacancies from './components/Vacancies';
import Seafarers from './components/Seafarers';
import Registration from './components/Registratioin';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import PrivacyPolicy from './components/PrivacyPolicy';
import Account from './components/Account';
import PasswordChange from './components/PasswordChange';

function App() {
  const [user, setUser] = useState(null);
  //State for useffect when form submitted for firing it
  const [submittedForm, setSubmittedForm] = useState(false);

  //Check for user authentication
  useEffect(() => {
    const tokenSession = Cookies.get('session');
    if (tokenSession) {
      axios
        .get('http://localhost:5000/user-authentication')
        .then((userData) => {
          setUser(userData.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.log('noCookie');
    }
  }, [submittedForm]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayOut user={user} setUser={setUser} />}>
          <Route index element={<Home />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/seafarers" element={<Seafarers />} />
          <Route path="/account" element={<Account />} />
          <Route
            path="/registration"
            element={<Registration setSubmittedForm={setSubmittedForm} />}
          />
          <Route
            path="/login"
            element={<Login setSubmittedForm={setSubmittedForm} />}
          />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/reset-password/:id" element={<PasswordChange />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
