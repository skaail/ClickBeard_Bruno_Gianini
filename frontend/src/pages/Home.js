import TableHorarios from '../components/TableHorarios'
import React, { useEffect, useState } from 'react'

const headers = [
  'Cliente',	
  'Barbeiro',
  'Data',
  'Horario'
]

const tokenString = localStorage.getItem('token');
const userToken = JSON.parse(tokenString);

function Home() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/agendamentoshoje/', {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': userToken}})
        .then(response => response.json())
        .then(data => setData(data))

}, [])

  return (
    <div style={{display: 'flex', width: "100%", alignItems: 'center', flexDirection: 'column'}}>
      <h1>Horários de hoje</h1>
      <div style={{padding: '15px', width: '100%'}}>
        <TableHorarios data = {data} headers = {headers} tipo = 'barbeiro'/>
      </div>

  </div>
  )
}

export default Home