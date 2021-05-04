import React, { useState, useEffect } from 'react';
import API from '../../../API';
import { Redirect, useParams } from 'react-router-dom'
import { Button, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Spinner } from 'reactstrap';


export default function ClientEdit() {

    const { clientID } = useParams();

    const [client, setClient] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        API.get(`/clients/${clientID}`).then(res => {
            if (res.status === 200) {
                setClient(res.data);
            } else {
                alert('Something goes wrong, please refresh page.');
            }
        });
    }, [])

    const handleChange = e => {
        var cl = client;
        cl[e.target.name] = e.target.value;
        setClient({ ...cl });
    }
    const sendForm = () => {
        var errors = {};
        if (client.name != null) {
            if (client.name.length < 5) {
                errors.name = true;
            }
        }
        if (client.phone != null) {
            if (client.phone.length != 9) {
                errors.phone = true;
            }
        }
        if (client.nip != null) {
            if (client.nip.length > 0) {
                errors.nip = true;
            }
        }


        if (Object.keys(errors).length == 0) {
            API.patch(`/clients/${client.id}`, { ...client }).then(res => {
                if (res.status == 200 && res.data === 1) {
                    setRedirect(true);
                }
            })
        } else {
            setFormErrors({ ...errors });
        }

    }

    return (
        <>
            {client ?
                <>
                    <FormGroup>
                        <Label for="name">Imię nazwiko / Nazwa Firmy</Label>
                        <Input invalid={formErrors.name ? true : false} value={client.name} onChange={(e) => { handleChange(e) }} type="text" name="name" id="name" placeholder="Imię nazwiko / Nazwa Firmy" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Adres</Label>
                        <Input invalid={formErrors.address ? true : false} value={client.address} onChange={(e) => { handleChange(e) }} type="text" name="address" id="address" placeholder="Adres" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Telefon</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>+48</InputGroupText>
                            </InputGroupAddon>
                            <Input invalid={formErrors.phone ? true : false} value={client.phone} onChange={(e) => { handleChange(e) }} type="text" name="phone" id="phone" placeholder="Telefon" />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="nip">NIP <small>(jeśli klient jest firmą)</small></Label>
                        <Input invalid={formErrors.nip ? true : false} value={client.nip} onChange={(e) => { handleChange(e) }} type="text" name="nip" id="nip" placeholder="NIP" />
                    </FormGroup>
                    <Button color='success' onClick={() => { sendForm(); }}>Zapisz</Button>
                    {redirect ? <Redirect to={'/clients/' + client.id} /> : ''}
                </> : <Spinner />}
        </>
    )
}