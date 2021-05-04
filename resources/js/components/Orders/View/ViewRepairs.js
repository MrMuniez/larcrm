import React from 'react';
import { Button } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Col, Row, Table } from 'reactstrap';
import API from '../../../API';
import Moment from 'react-moment';


export default function OrderViewRepairs({ order,refreshOrder}) {

    const deleteRepair = (id) =>{
        API.delete(`/repairs/${id}`).then(res=>{
            refreshOrder();
        }); 
    }

    const doneRepair = (id)=>{
        API.patch(`/repairs/${id}`,{done:1}).then((res)=>{
            refreshOrder();
        })
    }

    return (
        <>
            {order.repairs.length > 0 ?
                <Table striped>
                    <thead>
                        <tr>
                            <td>Nazwa</td>
                            <td>Cena netto</td>
                            <td>Stawka VAT</td>
                            <td>Cena brutto</td>
                            <td>Wykonano</td>
                            <td>_</td>
                        </tr>
                    </thead>
                    <tbody>
                        {order.repairs.map((val,i)=>{
                            return <tr key={i}>
                                <td>{val.name}</td>
                                <td>{val.netto}</td>
                                <td>{val.vat}</td>
                                <td>{val.brutto}</td>
                                <td>{val.done ? <Moment format="DD-MM-YYYY HH:mm" locale='pl'>{val.updated_at}</Moment> : <Button onClick={()=>{doneRepair(val.id)}} color='success'>Zamontuj</Button>}</td>
                                <td><Button color='danger' onClick={()=>{deleteRepair(val.id)}}>Usuń</Button></td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                :
                <Alert color='primary'>Nie dodano jeszcze żadnej naprawy</Alert>
        }
        </>
    )
}