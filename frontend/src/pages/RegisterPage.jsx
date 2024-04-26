import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

function RegisterPage() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      setMessage("Passwords do not match");
    } else if (pass2.length < 6) {
      setMessage("Password must have at least 6 characters");
    } else {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fname,
            lname,
            email,
            password: pass1,
          }),
        });

        if (response.status !== 200) {
          setMessage("Username or Email ID already exists!");
        } else {
          setMessage("User registered successfully!");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error:", err);
        setMessage("Some error occurred: " + err.message);
      }
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">Register</div>
              <div className="card-body">
                {message && <Alert variant="danger">{message}</Alert>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fname"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lname"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={pass1}
                      onChange={(e) => setPass1(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={pass2}
                      onChange={(e) => setPass2(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary my-3">
                    Submit
                  </button>
                  <br />
                  <small id="emailHelp" className="form-text text-muted">
                    Already User? <Link to="/login">Login</Link>
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default RegisterPage;
