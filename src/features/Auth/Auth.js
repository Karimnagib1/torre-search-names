import React from "react";
import Login from "../../components/Login/Login.js";
import "./Auth.css";
import Signup from "../../components/Signup/Signup.js";
const Auth = () => {
  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <Signup />
      <Login />
    </div>
  );
};

export default Auth;
