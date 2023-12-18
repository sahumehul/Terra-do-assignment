import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Header.css"

export const Header = () => {
  const auth = localStorage.getItem("token");
  const navigate = useNavigate()
  const logout =()=>{
    localStorage.clear();
    navigate("/")
  }
  return (
    <div>
        <ul className='nav-ul'>
            <li><Link to="/addtask">Add task</Link></li>
            <li>{auth ? <Link to="/" onClick={logout}>Logout</Link> : <Link to="/">Login</Link>}</li>
        </ul>
    </div>
  )
}