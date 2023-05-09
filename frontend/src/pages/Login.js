import React, { useState } from 'react'
import PropTypes from 'prop-types';
import './login.css';


function Login({setToken}) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function adicionar(){

    const data = new URLSearchParams();
    data.set("email", email);
    data.set("password", password);


    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data
  };

  return fetch('http://localhost:3001/api/login/', requestOptions)
      .then(response => response.json())
  }

   const handleSubmit = async e => {
    e.preventDefault();
    const token = await adicionar()
    console.log(token)
    if(token.auth){
      setToken(token.token)
      localStorage.setItem('token', JSON.stringify(token.token))
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form">
        <label>
          <input className="input" type="text" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <input className="input" type="password" placeholder='Senha' onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
    </div>

  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login