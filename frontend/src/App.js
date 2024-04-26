import './App.css';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminAddUser from "./pages/AdminAddUser";
import PrivateRouter from './utils/PrivateRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRouter />}></Route>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/adduser" element={<AdminAddUser />}></Route>
        </Routes>
      </BrowserRouter>
  </>
  );
}

export default App;
