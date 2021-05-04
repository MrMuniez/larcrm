import React, { useState, useEffect } from 'react';
import { Button, Spinner, Col, Row, Card, FormGroup, Label, Input, DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import {
    useRouteMatch,
    useParams,
    Redirect
} from 'react-router-dom';
import API from '../../../API';
import moment from 'moment';

export default function OrderAdd() {
    const { clientID } = useParams();
    const [redirect,setRedirect] = useState(false);
    const [itemTypes, setItemTypes] = useState([]);
    const [itemTypeSelected, setTypeSelected] = useState({});
    const [order, setOrder] = useState({
        name: '',
        item_type_id: 0,
        problem_description: '',
        item_description: '',
        diagnose: '',
        client_diagnose: '',
        loan: '',
        planned_cost: '',
        warranty: false,
        planned_end : moment().add(14,'days').format('yyyy-MM-DD'),
    });

    const handleChange = e => {
        var or = order;
        or[e.target.name] = e.target.value;
        setOrder({...or});
    }

    const typeChange = type => {
        setOrder({ ...order, item_type_id: type.id });
    }

    useEffect(() => {
        API.get('/itemtypes').then((data) => {
            if (data.status === 200) {
                setItemTypes(data.data);
                setOrder({ ...order, item_type_id: data.data[0].id });
            }
        })
    }, []);

    const sendForm = ()=>{
        API.post('/orders',{...order,client_id:clientID }).then(function(data){
            if(data.status===200){
                setRedirect(true);
            }
        })
    }

    return (
        <>
            {(itemTypes) ?
                <div>
                    <Row form className='mb-4' >
                        <Col md={6} >
                            <Card body className='mt-3 mb-3 p-2' >
                                <FormGroup className='w-100'>
                                    <Label for="item_type_id">Typ przedmiotu</Label>
                                    <UncontrolledDropdown className='w-100'>
                                        <DropdownToggle caret>
                                            {itemTypes.find(element => element.id == order.item_type_id) ? itemTypes.find(element => element.id == order.item_type_id).name : ''}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {itemTypes.map((val, ind) => {
                                                return <DropdownItem onClick={() => { typeChange(val) }} key={ind}>{val.name}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="name">Nazwa przedmiotu</Label>
                                    <Input value={order.name} onChange={(e)=>{handleChange(e)}} type="text" name="name" id="name" placeholder="Nazwa urządzenia" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="serial_number">Numer seryjny</Label>
                                    <Input value={order.serial_number} onChange={(e)=>{handleChange(e)}} type='text' name="serial_number" id="serial_number" placeholder="Numer seryjny" />
                                </FormGroup>
                            </Card>
                            <Card className='mt-3 mb-3 p-2'>
                                <FormGroup check>
                                    <Label check for="warranty">
                                        <Input value={order.warranty} onChange={(e)=>{handleChange(e)}} type='checkbox' name="warranty" id="warranty" />
                                        Naprawa gwarancyjna
                                    </Label>
                                </FormGroup>
                            </Card>
                            <Card className='mt-3 mb-3 p-2'>
                                <FormGroup>
                                    <Label for="planned_cost">Planowany koszt <small>Akceptowany przez klienta w dniu dostarczenia</small></Label>
                                    <Input value={order.planned_cost} onChange={(e)=>{handleChange(e)}} type='text' name="planned_cost" id="planned_cost" placeholder="Planowany koszt" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="loan">Kwota pobranej zaliczki</Label>
                                    <Input value={order.loan} onChange={(e)=>{handleChange(e)}} type='text' name="loan" id="loan" placeholder="Planowany koszt" />
                                </FormGroup>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className='mt-3 mb-3 p-2'>
                                <FormGroup>
                                    <Label for="plannedEnd">Planowane zakończenie naprawy</Label>
                                    <Input value={order.planned_end} onChange={(e)=>{handleChange(e)}} type='date' name="planned_end" id="planned_end" />
                                </FormGroup>
                            </Card>
                            <Card body className='mt-3 mb-3'>
                                <FormGroup>
                                    <Label for="problem_description">Opis usterki</Label>
                                    <Input value={order.problem_description} onChange={(e)=>{handleChange(e)}} type="textarea" name="problem_description" id="problem_description" placeholder="Usterka" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="item_description">Opis przedmiotu</Label>
                                    <Input value={order.item_description} onChange={(e)=>{handleChange(e)}} type="textarea" name="item_description" id="item_description" placeholder="Opis przedmiotu" />
                                </FormGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Button onClick={sendForm} color='success'>Zapisz</Button>
                </div>
                :
                <Spinner />
            }
            {(redirect) ?
            <Redirect to="/orders" /> : ""}
        </>
    )
}