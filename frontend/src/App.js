import './App.css';

import React, { useState, useEffect } from 'react'

import jwt_decode from "jwt-decode";

import Login from './pages/Login';
import AppAdmin from './Apps/AppAdmin';
import AppCliente from './Apps/AppCliente';

function App() {

  const [ token, setToken ] = useState();


  useEffect(() => {
    const tokenString = localStorage.getItem('token')
    const userToken = JSON.parse(tokenString)

    setToken(userToken)
  }, []);

  

  if(!token) {
    return <Login setToken={setToken} />
  }else{
    if(jwt_decode(token).role === 1){
      return  <AppAdmin />
    }else{
      return <AppCliente />
    }
  }

  
}

export default App;
