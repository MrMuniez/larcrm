import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Table, Spinner, Navbar, Collapse, Nav, NavbarText, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, NavItem, Button, ButtonGroup } from 'reactstrap';
import API from '../../../API';
import AddOrderModal from '../Modal/AddModal';

export default function OrderList({history}) {

    const [addOrderModalState, toogleOrderModalState] = useState(false);
    const [orders, setOrders] = useState([]);
    const [deleteRedirect,setDeleteRedirect] = useState(false);
    useEffect(() => {
        API.get('orders').then(res => {
            setOrders(res.data);
        })
    }, []);


    const deleteOrder = (ind) =>{
        API.delete(`/orders/${orders[ind].id}`).then(res=>{
            window.location.reload();
        })
    }

    return (
        <>
            <Nav className="border">
                <NavItem className="mr-auto" >

                </NavItem>
                <NavItem>
                    <Button color='primary' onClick={() => toogleOrderModalState(!addOrderModalState)}>
                        Dodaj Naprawę
                    </Button>
                </NavItem>
                {/* <NavbarText>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Akcje
                        </DropdownToggle>
                        <DropdownMenu right>
                            
                            <DropdownItem>
                                Option 2
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Reset
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </NavbarText> */}
            </Nav>
            <Table striped>
                <thead>
                    <tr>
                        <td>
                            Nazwa
                            </td>
                        <td>
                            Klient
                            </td>
                        <td>
                            Status
                            </td>
                        <td>
                            Planowany koniec
                            </td>
                        <td>
                            Akcje
                            </td>
                    </tr>
                </thead>
                <tbody>
                    {(orders) ?
                        orders.map((val, i) => {
                            return (
                                <tr key={i}>
                                    <td>{val.type.name} {val.name}</td>
                                    <td>{val.client.name}</td>
                                    <td>{val.state.name}</td>
                                    <td>{moment(val.planned_end).format('DD-MM-yyyy')}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={()=>{return "/orders/"+val.id}} ><Button color='success'>Szczegóły</Button></Link>
                                            <Link to={()=>{return "/orders/edit/"+val.id}} ><Button color='primary'>Edytuj</Button></Link>
                                            <Button onClick={()=>confirm(`Jesteś pewny że chcesz usunąć naprawe ${val.type.name} ${val.name}?`) ? deleteOrder(i) : false } color='danger'>Usuń</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        <Spinner color="primary" />}

                </tbody>
            </Table>
            <AddOrderModal state={addOrderModalState} toggle={() => toogleOrderModalState(!addOrderModalState)} />

            {(deleteRedirect) ? <Redirect to='/orders'/> : ''}
        </>
    )
}  