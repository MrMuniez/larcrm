import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import API from '../../../API';
import Autocomplete from '../../../StaticComponents/Autocomplete';
import { Redirect } from "react-router-dom";


export default function AddOrderModal({ state, toggle }) {
    const [ draft, setDraft ] = useState('');
    const [ clients, setClients ] = useState([]);
    const [redirect,setRedirect] = useState('');

    const inputChange = e=>{
        setDraft(e.target.value);
    }

    useEffect(() => {
        if(draft.length >= 3){
            API.get(`clients?q=${draft}`).then(function(data){
                if(data.status === 200){
                    setClients(data.data);
                }else{
                    alert('Coś poszło nie tak, :(');
                }
                
            })
        }
    }, [draft]);

    const autocompleteOnSelect = function(value){
        setRedirect(`/orders/add/${value.id}`);
    }

    return (
        <>
            <Modal isOpen={state} toggle={toggle} >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <Autocomplete value={draft} onChange={inputChange} onSelect={autocompleteOnSelect} placeholder="Wyszukaj klienta" label="Znajdz Klienta" data={clients} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            {redirect.length > 0 ? 
            <Redirect to={redirect} />: ''}
        </>
    )

}