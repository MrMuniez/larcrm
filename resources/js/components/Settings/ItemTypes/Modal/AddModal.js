
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Input, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import API from '../../../../API';

export default function ItemTypeAddModal({ state, toggle }) {
    const [typeName, setTypeName] = useState('');
    const [nameError, setNameError] = useState(false);

    const onSubmit = () => {

        if (typeName.length > 3) {
            API.post('/itemtypes', { name: typeName }).then((res) => {
                window.location.reload();
            })
        } else {
            setNameError(true);
        }
    }

    return (
        <>
            <Modal isOpen={state} toggle={toggle}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <FormGroup >
                        <Label for='itemtypeName'>Nazwa</Label>
                        <Input invalid={nameError} type='text' name='name' onChange={(e) => { setTypeName(e.target.value) }} placeholder='Słowo do dodania' />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => { onSubmit() }}>Zapisz</Button>
                    <Button color="danger" onClick={toggle}>Anuluj</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}