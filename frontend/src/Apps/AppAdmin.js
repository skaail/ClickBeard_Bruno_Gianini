import React from 'react'

import Home from '../pages/Home';
import Barbeiros from '../pages/Barbeiros';
import Horarios from '../pages/Horarios';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

function AppAdmin() {
  return (
    <div className="App">
        <BrowserRouter className="Layout">
        <Sidebar>
          <Menu>
            <Link to='/'><MenuItem>Home</MenuItem></Link>
            <Link to='/barbeiros'><MenuItem>Barbeiros</MenuItem></Link>
            <Link to='/horarios'><MenuItem>Horários</MenuItem></Link>
          </Menu>
        </Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barbeiros" element={<Barbeiros />} />
            <Route path="/horarios" element={<Horarios />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default AppAdmin