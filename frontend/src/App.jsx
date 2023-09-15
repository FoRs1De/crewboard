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
import Account from './components/account/Account';
import PasswordChange from './components/PasswordChange';
import EmailVerification from './components/EmailVerification';

function App() {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  //State for useffect when form submitted for firing it
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [passwordResetRequested, setPasswordResetRequested] = useState(false);

  //Check for user authentication
  useEffect(() => {
    const tokenSession = Cookies.get('session');
    const tokenPasswordReset = Cookies.get('passwordReset');
    if (tokenSession) {
      setIsloggedIn(true);
      axios
        .get('http://localhost:5000/user-authentication')
        .then((userData) => {
          setUser(userData.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
    if (tokenPasswordReset) {
      setPasswordResetRequested(true);
    } else {
      setPasswordResetRequested(false);
    }
  }, [submittedForm]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayOut user={user} setUser={setUser} />}>
          <Route index element={<Home />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/seafarers" element={<Seafarers />} />
          {isLoggedIn ? (
            <Route
              path="/account"
              element={
                <Account
                  setSubmittedForm={setSubmittedForm}
                  setUser={setUser}
                />
              }
            />
          ) : null}

          <Route
            path="/registration"
            element={
              <Registration
                setSubmittedForm={setSubmittedForm}
                setUserEmail={setUserEmail}
                userEmail={userEmail}
              />
            }
          />
          <Route path="/verify/:token" element={<EmailVerification />} />
          <Route
            path="/login"
            element={
              <Login
                setSubmittedForm={setSubmittedForm}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              />
            }
          />
          {passwordResetRequested ? (
            <Route path="/reset-password/:id" element={<PasswordChange />} />
          ) : null}
          <Route
            path="/reset-password"
            element={<PasswordReset setSubmittedForm={setSubmittedForm} />}
          />

          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
