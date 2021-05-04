import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { Nav, NavItem, Table, Button } from 'reactstrap';
import API from '../../../../API';
import ItemTypeAddModal from '../Modal/AddModal';


export default function ItemTypeList() {

    const [items, setItems] = useState([]);
    const [addModalState, setAddModalState] = useState(false);
    const [redirectRefresh, setRedirectRefresh] = useState(false);

    const AddModalToggle = () => {
        setAddModalState(!addModalState);
    }

    useEffect(() => {
        loadContent();
    }, [])

    const deleteItem = async (ind) => {
        let todel = items[ind];
        let data = await API.delete(`/itemtypes/${todel.id}`);
        loadContent();
    }

    const loadContent = async () => {
        API.get('/itemtypes').then(res => {
            if (res.status === 200) {
                setItems(res.data);
            }
        })
    }
    return (
        <>
            <Nav className='m-3'>
                <NavItem className="mr-auto" >

                </NavItem>
                <NavItem>
                    <Button onClick={() => { AddModalToggle() }} color='primary'>
                        Dodaj Typ przedmiotu
                    </Button>
                </NavItem>
            </Nav>
            {items.length > 0 ?
                <Table striped>
                    <thead>
                        <tr>
                            <td>
                                Nazwa
                            </td>
                            <td>
                                ___
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((val, ind) => {
                            return <tr key={ind}>
                                <td>
                                    {val.name}
                                </td>
                                <td>
                                    <Button onClick={() => confirm(`Jesteś pewny że chcesz usunąć wpis ${val.name}?`) ? deleteItem(ind) : false} color='danger'>Usuń</Button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                :
                <div className='alert alert-primary'>Nie znaleziono</div>}

            <ItemTypeAddModal state={addModalState} toggle={AddModalToggle} />
            {redirectRefresh ? <Redirect to='/settings' /> : ''}
        </>
    )
}