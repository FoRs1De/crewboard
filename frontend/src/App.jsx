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
import Seafarer from './components/Seafarer';

function App() {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [countVacancies, setCountVacancies] = useState({});
  const [loadVacancies, setLoadVacancies] = useState(false);
  const [allVacancies, setAllVacancies] = useState([]);
  const [clear, setClear] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  //State for useffect when form submitted for firing it
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [submittedForm, setSubmittedForm] = useState(false);
  const [passwordResetRequested, setPasswordResetRequested] = useState(false);
  const [vacanyPosted, setVacancyPosted] = useState(false);
  const [seamen, setSeamen] = useState([]);
  const [allSeamen, setAllSeamen] = useState([]);
  const [updateSeamen, setUpdateSeamen] = useState(false);

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

  useEffect(() => {
    const receiveCountVacancies = async () => {
      await axios
        .get(`${import.meta.env.VITE_API_URL}/count-vacancies`)
        .then((response) => {
          setCountVacancies(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    receiveCountVacancies();
  }, [loadVacancies]);

  useEffect(() => {
    const getAllVacancies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-vacancies/`
        );
        const reversedResponse = response.data.reverse();
        setVacancies(reversedResponse);
        setAllVacancies(reversedResponse);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllVacancies();
  }, [clear, vacanyPosted]);

  useEffect(() => {
    const getAllVacancies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-seamen/`
        );
        const reversedResponse = response.data.reverse();
        setSeamen(reversedResponse);
        setAllSeamen(reversedResponse);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllVacancies();
  }, [updateSeamen]);

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
              countVacancies={countVacancies}
            />
          }
        >
          <Route
            index
            element={
              <Home
                countVacancies={countVacancies}
                setCountVacancies={setCountVacancies}
                setLoadVacancies={setLoadVacancies}
                allVacancies={allVacancies}
                vacancies={vacancies}
                setVacancies={setVacancies}
              />
            }
          />
          <Route
            path="/vacancies/"
            element={
              <Vacancies
                countVacancies={countVacancies}
                setLoadVacancies={setLoadVacancies}
                setClear={setClear}
                allVacancies={allVacancies}
                vacancies={vacancies}
                setVacancies={setVacancies}
              />
            }
          />
          <Route
            path="/vacancies/:id"
            element={
              <Vacancy user={user} setSubmittedForm={setSubmittedForm} />
            }
          />
          <Route
            path="/seafarers"
            element={
              <Seafarers
                seamen={seamen}
                setSeamen={setSeamen}
                allSeamen={allSeamen}
                setUpdateSeamen={setUpdateSeamen}
              />
            }
          />
          <Route
            path="seafarers/:id"
            element={<Seafarer allSeamen={allSeamen} />}
          />
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
                  setVacancyPosted={setVacancyPosted}
                  vacanyPosted={vacanyPosted}
                  setLoadVacancies={setLoadVacancies}
                  setUpdateSeamen={setUpdateSeamen}
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
