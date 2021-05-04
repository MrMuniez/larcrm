import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { Row } from 'reactstrap';
import { Label } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Modal } from 'reactstrap';
import API from '../../../../API';



export default function OrderItemAddModal({ modalState, modalToggle, order }) {


    const [value, setValue] = useState('');
    const [amount,setAmount] = useState(1);
    const [data, setData] = useState([]);
    const [netto, setNetto] = useState(0);
    const [vat, setVat] = useState(23);
    const [brutto, setBrutto] = useState(0);
    const itemSave = () =>{

    }
    const valueEdit = (val) =>{
        
        if(val.length > 3){
            API.post('/warehouse/find',{q:val}).then(res=>{
                console.log(res);
            })
        }


        setValue(val);
    }

    const onVatEdit = function (val) {
        if (val != 0) {
            let nvat = (val/100 ) +1;
            let nnetto = (brutto / nvat).toFixed(2);
            setNetto(nnetto);
        }
        setVat(val);
    }
    const nettoEdit = function (e) {
        let val = e.target.value;
        let nvat = (vat/100) + 1;
        let brutto = (val*nvat).toFixed(2);
        setNetto(val);
        setBrutto(brutto);
    }
    const bruttoEdit = function (e) {
        let val = e.target.value;
        let nvat = (vat/100) + 1;
        let netto = (val/nvat).toFixed(2);
        setNetto(netto);
        setBrutto(val);
    }


    return (
        <>
            <Modal toggle={modalToggle} isOpen={modalState}>
                <ModalHeader toggle={modalToggle}>Modal title</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="autocomplete_input">{label}</Label>
                        <Input autoComplete='off' value={value ? value : ''} name='autocomplete_input' id='autocomplete_input' onChange={(e)=>{valueEdit(e.target.value)}} placeholder="Wyszukaj przedmiot" />
                        <div className='autocomplete_container'>

                            {value.length >= 3 ?
                                <ul>
                                    {
                                        data.length > 0 ?
                                            data.map((val, ind) => {
                                                return <li key={ind} className='item' onClick={() => { onSelect(val) }}>{val.name} Brutto:{val.brutto}</li>
                                            }) :
                                            <li className='notFound'> Nie znaleziono : {value}</li>
                                    }
                                </ul> : ''}

                        </div>
                    </FormGroup>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label>Netto</Label>
                                <Input name='netto' placeholder='Netto' onChange={(e) => { nettoEdit(e) }} value={netto} />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Stawka Vat</Label>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {vat}%
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => { onVatEdit(23) }}>23%</DropdownItem>
                                        <DropdownItem onClick={() => { onVatEdit(8) }}>8%</DropdownItem>
                                        <DropdownItem onClick={() => { onVatEdit(5) }}>5%</DropdownItem>
                                        <DropdownItem onClick={() => { onVatEdit(0) }}>0%</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Brutto</Label>
                                <Input name='brutto' placeholder='Brutto' onChange={(e) => { bruttoEdit(e) }} value={brutto} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label>Ilość</Label>
                        <Input name='amount' onChange={(e)=>{setAmount(e.target.value)}} placeholder="Ilość " value={amount}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => { itemSave(); }}>Dodaj</Button>{' '}
                    <Button color="danger" onClick={modalToggle}>Anuluj</Button>
                </ModalFooter>
            </Modal>
        </>
    )

}