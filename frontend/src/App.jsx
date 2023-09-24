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
import Companies from './components/Companies';
import Vacancy from './components/Vacancy';
import Company from './components/Company';

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
        .get(`${import.meta.env.VITE_API_URL}/user-authentication`)
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
        <Route
          path="/"
          element={
            <MainLayOut
              user={user}
              setUser={setUser}
              setIsloggedIn={setIsloggedIn}
            />
          }
        >
          <Route index element={<Home />} />
          <Route path="/vacancies/" element={<Vacancies />} />
          <Route path="/vacancies/:id" element={<Vacancy />} />
          <Route path="/seafarers" element={<Seafarers />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="companies/:id" element={<Company />} />
          {isLoggedIn ? (
            <Route
              path="/account"
              element={
                <Account
                  setSubmittedForm={setSubmittedForm}
                  setUser={setUser}
                  user={user}
                  setIsloggedIn={setIsloggedIn}
                />
              }
            />
          ) : null}
          {!isLoggedIn && (
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
          )}
          {!isLoggedIn && (
            <Route path="/verify/:token" element={<EmailVerification />} />
          )}
          {!isLoggedIn && (
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
          )}

          {passwordResetRequested ? (
            <Route path="/reset-password/:id" element={<PasswordChange />} />
          ) : null}
          {!isLoggedIn && (
            <Route
              path="/reset-password"
              element={<PasswordReset setSubmittedForm={setSubmittedForm} />}
            />
          )}

          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
