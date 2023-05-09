import React, { useState, useEffect } from 'react'
import { FormControl, Select, Button } from '@chakra-ui/react'
import DateTimePicker from 'react-datetime-picker';

import jwt_decode from "jwt-decode";

import { format } from "date-fns";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

const tokenString = localStorage.getItem('token');
const userToken = JSON.parse(tokenString);


function Agendamentos() {
    const [data, setData] = useState([])
    const [especialidades, setEspecialidades] = useState([])
    const [error, setError] = useState(null)

    const [barbeiro, setBarbeiro] = useState('')

    const [value, onChange] = useState(new Date());
    

    useEffect(() => {
        fetch('http://localhost:3001/api/especializacao/', {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': userToken}})
            .then(response => response.json())
            .then(data => setEspecialidades(data))
    }, [])

    function barbeirosEspecialidade(id){
        fetch('http://localhost:3001/api/barbeirosspec/' +id, {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': userToken}})
        .then(response => response.json())
        .then(data => setData(data))
    }

    function onchange(e){
        console.log(e.target.value)
        barbeirosEspecialidade(e.target.value)
    }

    function novoBarbeiro(e){
        console.log(e.target.value)
        setBarbeiro(e.target.value)
    }

    function agendar(){
        var date = new Date(value);
        var formattedDate = format(date, "yyyy-MM-dd");
        var formattedHour = format(date, "HH:mm:ss")

        var data = formattedDate
        var hora = formattedHour

        console.log(data, barbeiro, hora, jwt_decode(userToken).role)

        const dataPost = new URLSearchParams();

        dataPost.set("data", data);
        dataPost.set("hora", hora);
        dataPost.set("id", barbeiro);
        dataPost.set('usuarios_id', jwt_decode(userToken).role)
    
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'x-access-token': userToken,
            },
            body: dataPost
        };
      
        fetch('http://localhost:3001/api/verificar', requestOptions)
            .then(response => response.json())
            .then(window.location.reload(false))
            .catch(err => {
                setError(err.message)
            })
    }


    return (
        <div>

        <FormControl>
            <Select placeholder='Select option' onChange={(e) => onchange(e)}>
            {especialidades.map((data) => (
                <option value={data.value}>{data.label}</option>
            ))}
            </Select>
        </FormControl>

        <FormControl>
            <Select placeholder='Select option' onChange={(e) => novoBarbeiro(e)}>
            {data.map((data) => (
                <option value={data.id}>{data.nome}</option>
            ))}
            </Select>
        </FormControl>

        <FormControl>
        <DateTimePicker onChange={onChange} value={value} />
        </FormControl>
            
        {error && <div>Horário indisponível</div>}

        <Button colorScheme='blue' onClick={(e) => {agendar()}}>Agendar</Button>
        </div>
    )
}

export default Agendamentos