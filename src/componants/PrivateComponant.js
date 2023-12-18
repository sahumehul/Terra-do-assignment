import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponant = () => {

    const auth = localStorage.getItem("token")
  return auth ? <Outlet/> : <Navigate to="/"/>
}

export default PrivateComponant