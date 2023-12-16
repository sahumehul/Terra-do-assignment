import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await dispatch(signinUser({ email, password }));
    //   console.log(res); // Access payload from the success action
      if (res.payload.message == "Email or password does not match!!") {
        alert("Login credetial mismatched");
      } else {
        alert("Logged in");
        localStorage.setItem("user", email);
        localStorage.setItem("token", res.payload.Token);
        navigate("/addproduct");
      }
    } catch (err) {
      alert("Email already exists or there was an error");
    }
  };
  return (
    <div className="register">
      <h1>Login</h1>
      <input
        className="inputText"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Enter Email"
      ></input>
      <input
        className="inputText"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter password"
      ></input>
      <button type="submit" onClick={handleLogin} className="btn-signup">
        Login
      </button>
    </div>
  );
};

export default Login;
