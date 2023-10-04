import { React, useState } from "react";

import "./Signup.css";
import { useDispatch } from "react-redux";
import { setAlert } from "../../features/AlertMessage/AlertSlice";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };

    const jsonResponse = await fetch(
      "https://torre-search-names.onrender.com/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (jsonResponse.status === 200) {
      dispatch(
        setAlert({
          message: "Signup successful",
          severity: "success",
          isVisible: true,
        })
      );
    } else {
      const response = await jsonResponse.json();
      dispatch(
        setAlert({
          message: Object.values(response)[0],
          severity: "error",
          isVisible: true,
        })
      );
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
