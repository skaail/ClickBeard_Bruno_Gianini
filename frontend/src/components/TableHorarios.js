import React from 'react'
import Table from 'react-bootstrap/Table';
import { format } from "date-fns";

function TableHorarios(props) {
    
    
    

    for(let i =0; i < props.data.length; i++){
        var date = new Date(props.data[i].data);
        var formattedDate = format(date, "dd/MM/yyyy");
        props.data[i].data = formattedDate
    }

  return (
    <>
    <Table striped bordered hover>
        <thead>
            <tr>
                { props.headers.map( (header) => <th>{header}</th>) }
            </tr>
        </thead>
        <tbody>
            {props.data.map((data) => (
                <tr>
                    <td>{data.cliente}</td>
                    <td>{data.barbeiro}</td>
                    <td>{data.data}</td>
                    <td>{data.horario}</td>
                </tr>
            ))}
        </tbody>
        </Table>
    </>
  )
}

export default TableHorarios