import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authUser } from "../../features/Auth/UserSlice.js";
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
    const response = await axios.post("https://torre-search-names.onrender.com/user/login", data);

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

      const payload = JSON.parse(
        window.atob(response.data.token.split(".")[1])
      );

      dispatch(authUser(payload));

      navigate("/");
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="pswd"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
