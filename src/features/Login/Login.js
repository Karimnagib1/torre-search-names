import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authUser } from "./UserSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:5000/user/login", data);

    if (response.status === 200) {
      // Calculate the expiration date
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      document.cookie = `Authorization=${
        response.data.token.split(" ")[1]
      }; expires=${expirationDate.toUTCString()}; path=/`;

      axios.defaults.headers.common["Authorization"] = `Bearer ${
        response.data.token.split(" ")[1]
      }`;
      console.log(response.data.token.split(" ")[1]);

      const payload = JSON.parse(
        window.atob(response.data.token.split(".")[1])
      );

      dispatch(authUser(payload));

      navigate("/");
    }
  };
  return (
    <div className="content-wrap">
      <div className="login-c">
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            id="email"
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>

          <input
            placeholder="Enter your password"
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
