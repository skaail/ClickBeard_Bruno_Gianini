import React from 'react'
import Table from 'react-bootstrap/Table';
import { format } from "date-fns";

function TableBarbeiros(props) {

    for(let i =0; i < props.data.length; i++){
        var date = new Date(props.data[i].dt_contratacao);
        var formattedDate = format(date, "dd/MM/yyyy");
        props.data[i].dt_contratacao = formattedDate
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
                    <td>{data.nome}</td>
                    <td>{data.idade}</td>
                    <td>{data.especialidade}</td>
                    <td>{data.dt_contratacao}</td>
                </tr>
            ))}
        </tbody>
        </Table>
    </>
  )
}

export default TableBarbeiros