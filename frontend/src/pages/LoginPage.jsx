import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Form, Card } from "react-bootstrap";
import { loginUser } from "../redux/AuthSlice";

function LoginPage() {
  const navigate = useNavigate()
  const [isAuthenticated, setauth] = useState(false)

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
     const token = localStorage.getItem('authTokens');
     if(token) {
      navigate('/')
     }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('heloo');
    const resultAction = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      setauth(true)
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">Login</div>
              <div className="card-body">
              {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                 
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                 
                  <button type="submit" className="btn btn-primary my-3">
                    Submit
                  </button> <br />
                  <small id="emailHelp" className="form-text text-muted">New User? <Link to="/register">Register</Link></small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
