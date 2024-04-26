import React, { useEffect } from "react";
// import { getlocal } from "../helpers/auth";
import { jwtDecode } from "jwt-decode";

// import AdminPanelPage from '../pages/AdminPanelPage'
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { useNavigate } from "react-router-dom";
import AdminPage from "../pages/AdminPage";


const PrivateRouter = ({ children, ...rest }) => {
  const token = localStorage.getItem('authTokens');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.is_admin) {
      console.log("Admin page");
      return <div>

      <AdminPage />
      </div>;
    } else if (!decoded.is_admin) {
      console.log("notAdmin page");

      return (
        <div>
          <HomePage title={"HOME PAGE"} />
        </div>
      );
    }
  } else {
    return null;
    // return (
    //   <div>
    //       <LoginPage/>
    //   </div>
    // )
  }
};

export default PrivateRouter;
