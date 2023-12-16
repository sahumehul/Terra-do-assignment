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

  const handleSubmit =async (e)=>{
      e.preventDefault(); // Prevent default form submission
  
      try {
        const res = await dispatch(signupUser({ name, email, password }));
        console.log(res.payload); // Access payload from the success action
        if(res.payload.status == 400){
          alert("Email already exist");
        }else{
          alert("Successfully account created");
        localStorage.setItem("user", email);
        navigate("/");
        }
      } catch (err) {
        alert("Email already exists or there was an error");
      }
    };
  
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