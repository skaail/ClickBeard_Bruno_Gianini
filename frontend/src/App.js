import './App.css';

import React, { useState, useEffect } from 'react'

import Login from './pages/Login';
import AppAdmin from './Apps/AppAdmin';
import AppBarbeiros from './Apps/AppBarbeiros';
import AppCliente from './Apps/AppCliente';

function App() {

  const [ token, setToken ] = useState();
  const [ role, setRole ] = useState();

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    const roleString = localStorage.getItem('role');
    const role = JSON.parse(roleString);

    setRole(role)
    setToken(userToken)

  }, []);

  

  if(!token) {
    return <Login setToken={setToken} />
  }

  if(role === 1){
    return  <AppAdmin />
  }else if(role === 2){
    return <AppBarbeiros />
  }else if(role === 3){
    return <AppCliente />
  }

  
}

export default App;
