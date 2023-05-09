import React from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Agendamentos from '../pages/Agendamentos';

function AppCliente() {

  return (
    <div className="App">
        <BrowserRouter className="Layout">
        <Sidebar>
          <Menu>
            <Link to='/'><MenuItem>Home</MenuItem></Link>
            <Link to='/agendamentos'><MenuItem>Agendar</MenuItem></Link>
          </Menu>
        </Sidebar>
          <Routes>
            <Route path="/agendamentos" element={<Agendamentos />}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default AppCliente