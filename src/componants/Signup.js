import { useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../redux/authSlice';

const SignUp = () => {

  const [name,setname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate =useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      navigate("/")
    }
  })

  const handleSubmit =(e)=>{
    dispatch(signupUser({name,email,password})).then((res)=>{
      console.log(res.meta.arg);
      alert("Successfully account created");
      localStorage.setItem("user",res.meta.arg.email)
      navigate("/");
    }).catch((err)=>{
      alert("Email already exist")
    })
  }
  return (
    <div className='register'>
    <h1>Register</h1>
        <input className="inputText" value={name} onChange={(e)=>setname(e.target.value)} type="text" placeholder='Enter name'></input>
        <input className="inputText" value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Enter Email'></input>
        <input className="inputText" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter password'></input>
        <button type='submit' onClick={handleSubmit} className='btn-signup'>Sign Up</button>
    </div>
  )
}

export default SignUp