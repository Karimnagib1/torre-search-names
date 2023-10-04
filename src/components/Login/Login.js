import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../../features/Auth/UserSlice.js";
import "./Login.css";
import { setAlert } from "../../features/AlertMessage/AlertSlice.js";
import { extractTokenFromCookie } from "../../utils/extractToken.js";

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

    const token = extractTokenFromCookie();
    const jsonResponse = await fetch(
      "https://torre-search-names.onrender.com/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    const response = await jsonResponse.json();

    if (response.status === 200) {
      // Calculate the expiration date
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);

      document.cookie = `Authorization=${
        response.data.token.split(" ")[1]
      }; expires=${expirationDate.toUTCString()}; path=/`;

      const payload = JSON.parse(
        window.atob(response.data.token.split(".")[1])
      );

      dispatch(
        setAlert({
          message: "Login successful",
          severity: "success",
          isVisible: true,
        })
      );
      dispatch(authUser(payload));

      navigate("/");
    } else {
      dispatch(
        setAlert({
          message: Object.values[response][0],
          severity: "error",
          isVisible: true,
        })
      );
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
