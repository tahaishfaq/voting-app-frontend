import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';

import { Toaster, toast } from 'react-hot-toast';
// import AdminPanel from './pages/AdminPanel';
import AdminPanel from './pages/AdminPanel';
import Manager from './pages/Manager';
import ManagerLogin from './pages/ManagerLogin';
import LandingPage from './pages/LandingPage';
function App() {

 

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path={'/home'} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/signup'} element={<Signup />} />
          {/* <Route path={'/adminpanel'} element={<AdminPanel />} /> */}
          <Route path="/adminpanel" element={<AdminPanel />} /> {/* Enable the route */}
          <Route path="/manager-login" element={<ManagerLogin />} />
          <Route path="/manager" element={<Manager />} />;
        </Routes>
        <Toaster  reverseOrder={false} />
      </BrowserRouter>
    </div>
  );
}

export default App;
