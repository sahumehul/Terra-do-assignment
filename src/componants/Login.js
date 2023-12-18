import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem("token");
    if(auth){
      navigate("/")
    }
  })
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const res = await dispatch(signinUser({ email, password }));
      // console.log(res); // Access payload from the success action
      if (res.payload.message == "Email or password does not match!!" || res.payload.message=="Email is not registered with us..") {
        alert("Login credetial mismatched");
      } else {
        alert("Logged in");
        localStorage.setItem("user", email);
        localStorage.setItem("token", res.payload.Token);
        navigate("/addtask");
      }
    } catch (err) {
      alert("Internal server error");
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
      <p>Don't have an account <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Login;
