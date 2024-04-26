import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/AuthSlice";
import { useDispatch } from "react-redux";



function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    console.log('hello');
    dispatch(logoutUser())
    navigate('/login')
    setIsAuthenticated(false)
}

  useEffect(() => {
    const token = localStorage.getItem('authTokens');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const authLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard" aria-current="page">
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <button onClick={handleLogout} className="nav-link">Logout</button>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login" aria-current="page">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register" aria-current="page">
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Auth Site
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" aria-current="page">
                Home
                <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
