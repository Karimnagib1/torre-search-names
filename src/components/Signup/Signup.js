import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Signup.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };
    const response = await axios.post(
      "http://localhost:5000/user/signup",
      data
    );
    if (response.status === 200) {
      navigate("/login");
    }
  };
  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">
          Sign up
        </label>
        <input
          type="text"
          name="txt"
          placeholder="Name"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="pswd"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          name="pswd"
          placeholder="Confirm Password"
          required
          onChange={(e) => {
            setPassword2(e.target.value);
          }}
        />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
