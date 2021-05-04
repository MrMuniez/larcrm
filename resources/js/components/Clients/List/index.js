import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Nav, NavItem, Spinner, Table } from 'reactstrap';
import API from '../../../API';
import {Link as RouterLink} from 'react-router-dom';



export default function ClientsList() {


    const [clients, setClients] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
      GetClients();
    }, [])

    const GetClients = () =>{
        API.get('/clients').then(data => {
            if (data.status === 200) {
                setDataLoaded(true)
                setClients(data.data);
            } else {
                console.log(data);
                alert('Some error was console logged');
            }
        })
    }


    const deleteClient = (ind) =>{
        API.delete(`/clients/${clients[ind].id}`).then(res=>{
            if(res.status === 200){
                GetClients();
            }
        })
    }

    return (
        <>
        <Nav className='m-3'>
                <NavItem className="mr-auto" >

                </NavItem>
                <NavItem>
                    <RouterLink to='/clients/add'>
                        <Button color='primary'>
                            Dodaj Klienta
                        </Button>
                    </RouterLink>
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
            {dataLoaded ?
                <Table striped>
                    <thead>
                        <tr>
                            <td>Imie i nazwisko/Nazwa</td>
                            <td>Adres</td>
                            <td>Numer telefonu</td>
                            <td>____</td>
                </tr>
                    </thead>
                    <tbody>
                        {clients.length > 0 ?
                            clients.map((val, ind) => {
                                return <tr key={ind}>
                                    <td>{val.name}</td>
                                    <td>{val.address ? val.address : 'Nie podano'}</td>
                                    <td> <a href={"tel:"+val.phone}>+48 {val.phone}</a></td>
                                    <td>
                                        <ButtonGroup>
                                            <Button color='success'>Szczegóły</Button>
                                            <RouterLink to={()=>{return "/clients/edit/"+val.id}} ><Button color='primary'>Edytuj</Button></RouterLink>
                                            <Button onClick={()=>confirm(`Jesteś pewny że chcesz usunąć klienta ${val.name}?`) ? deleteClient(ind) : false } color='danger'>Usuń</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            })
                            : <div className='alert alert-info'>Nie dodano żadnego klienta</div>}
                    </tbody>
                </Table> :
                <Spinner />}
        </>

    )
}
