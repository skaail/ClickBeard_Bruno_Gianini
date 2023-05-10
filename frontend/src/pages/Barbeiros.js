import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import TableNew from '../components/TableBarbeiros';
import { Button } from '@chakra-ui/react'
import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton} from '@chakra-ui/react'
import {FormControl,FormLabel} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { MultiSelect } from "react-multi-select-component";


const tokenString = localStorage.getItem('token');
const userToken = JSON.parse(tokenString);

function Barbeiros() {
  const [data, setData] = useState([])
  const [id, setId] = useState('')
  const [especialidades, setEspecialidades] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [nome, setNome] = useState('')
  const [idade, setIdade] = useState('')
  const [selected, setSelected] = useState([]);

  const headers = [
      'Nome',
      'Idade',
      'Especialidades',
      'Data de Contratação'
  ]

  useEffect(() => {
      fetch('http://localhost:3001/api/barbeiros/', {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': userToken}})
          .then(response => response.json())
          .then(data => setData(data))

        fetch('http://localhost:3001/api/especializacao/', {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-access-token': userToken}})
          .then(response => response.json())
          .then(data => setEspecialidades(data))
  }, [])

  const options = especialidades

  function addEspec(){
    const data = new URLSearchParams();

    for(let i =0; i <= selected.length; i++){
      data.set("especialidades_id", selected[i].value);
      data.set("barbeiros_id", id);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-access-token': userToken,
        },
        body: data
    };
  
    fetch('http://localhost:3001/api/barbeirosspec/', requestOptions)
        .then(response => response.json())
    }



  }

  function adicionar(){

    const data = new URLSearchParams();
    data.set("nome", nome);
    data.set("idade", idade);


    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': userToken,
      },
      body: data
  };

  fetch('http://localhost:3001/api/barbeiros/', requestOptions)
      .then(response => response.json())
      .then(data => {setId(data.rows[0].id)})
      .then(addEspec())

  }


return (
  <div style={{display: 'flex', width: "100%", alignItems: 'flex-end', flexDirection: 'column'}}>
    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>
      <h1>Horários de hoje</h1>
      <Button onClick={onOpen} style={{margin: '15px'}} colorScheme='blue'>Adicionar</Button>
    </div>

      <div style={{padding: '15px', width: '100%'}}>
        <TableNew data = {data} headers = {headers} tipo = 'barbeiro'/>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adicionar Barbeiro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input type='nome' onChange={(e) => {setNome(e.target.value)}}/>
          </FormControl>

          <FormControl>
            <FormLabel>Idade</FormLabel>
            <Input type='idade' onChange={(e) => {setIdade(e.target.value)}}/>
          </FormControl>

          <FormControl>
            <FormLabel>Especialidades</FormLabel>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={(e) => {adicionar()}}>Adicionar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  </div>
)
}

export default Barbeiros