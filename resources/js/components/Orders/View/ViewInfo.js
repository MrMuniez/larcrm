import { Button } from 'reactstrap';
import React, { useState } from 'react';
import { PencilSquare } from 'react-bootstrap-icons';
import { DropdownItem } from 'reactstrap';
import { DropdownToggle } from 'reactstrap';
import { DropdownMenu } from 'reactstrap';
import { UncontrolledDropdown } from 'reactstrap';
import { Col, Progress, Row, Table } from 'reactstrap';
import API from '../../../API';


export default function OrderViewInfo({ order, repairStates, refreshOrder}) {

    const [editState, setEditState] = useState(false);
    const [newState,setNewState] = useState(null);
    
    const saveOrderState = function() {
        API.patch(`/orders/${order.id}`,{repair_state_id:newState.id}).then(res=>{
            refreshOrder();
            setEditState(false);
        })
    }
    
    return (
        <>
            {order ?
                <Row>
                    <Col>
                        <Table striped>
                            <tbody>
                                <tr>
                                    <td>Typ przedmiotu</td>
                                    <td>{order.type.name}</td>
                                </tr>
                                <tr>
                                    <td>Nazwa</td>
                                    <td>{order.name}</td>
                                </tr>
                                <tr>
                                    <td>Klient</td>
                                    <td>{order.client.name}</td>
                                </tr>
                                <tr>
                                    <td>Numer Telefony klienta</td>
                                    <td>{order.client.phone}</td>
                                </tr>
                                <tr>
                                    <td>Przyjęto dnia</td>
                                    <td>{order.created_at}</td>
                                </tr>
                                <tr>
                                    <td>Planowany koniec</td>
                                    <td>{order.planned_end}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Table striped>
                            <tbody>
                                {editState ?
                                    <>
                                        <tr>
                                            <td>
                                                Zmień status naprawy
                                            </td>
                                            <td>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle caret>
                                                        {newState != null ? newState.name : order.state.name}
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        {repairStates.map((val,i)=>{
                                                           return (val.precentage > order.state.precentage) ? <DropdownItem onClick={()=>{setNewState(val)}} key={i}>{val.name}</DropdownItem> : ''
                                                        })}
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                                <Button onClick={()=>{saveOrderState()}} color='success'>Zapisz</Button>
                                                <Button onClick={() => { setEditState(!editState);setNewState(null)}} color='danger'>Anuluj</Button>
                                            </td>
                                        </tr>
                                    </> :
                                    <tr>
                                        <td>Aktualny status naprawy</td>
                                        <td>{order.state.name} <PencilSquare onClick={() => { setEditState(!editState) }} /></td>
                                    </tr>
                                }
                                <tr>
                                    <td colSpan={2}><Progress animated value={order.state.precentage} max={100} >{order.state.precentage}%</Progress></td>
                                </tr>
                                <tr>
                                    <td>Opis usterki</td>
                                    <td>{order.problem_description}</td>
                                </tr>
                                <tr>
                                    <td>Diagnoza dla serwisu</td>
                                    <td>{order.diagnose ?? 'Nie zdiagnozowano'}</td>
                                </tr>
                                <tr>
                                    <td>Diagnoza dla klienta</td>
                                    <td>{order.client_diagnose ?? 'Nie podano'}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                : ''}
        </>
    )
}