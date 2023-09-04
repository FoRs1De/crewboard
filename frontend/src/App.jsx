import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayOut from './components/MainLayout';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Vacancies from './components/Vacancies';
import Seafarers from './components/Seafarers';
import Registration from './components/Registratioin';
import Login from './components/Login';
import PasswordReset from './components/PasswordReset';
import RegistrationSuccess from './components/RegistrationSuccess';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainLayOut />}>
          <Route index element={<Home />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/seafarers" element={<Seafarers />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route
            path="/registration-success"
            element={<RegistrationSuccess />}
          />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
