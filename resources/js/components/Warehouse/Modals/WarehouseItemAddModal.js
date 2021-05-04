import React,{useState} from 'react';
import { ModalFooter } from 'reactstrap';
import { FormGroup } from 'reactstrap';
import { Input } from 'reactstrap';
import { Col } from 'reactstrap';
import { DropdownToggle } from 'reactstrap';
import { DropdownItem } from 'reactstrap';
import { DropdownMenu } from 'reactstrap';
import { UncontrolledDropdown } from 'reactstrap';
import { Row } from 'reactstrap';
import { Label } from 'reactstrap';
import { Button } from 'reactstrap';
import { ModalBody } from 'reactstrap';
import { ModalHeader } from 'reactstrap';
import { Modal } from 'reactstrap';
import API from '../../../API';



export default function WarehouseItemAddModal({modalState,modalToggle,refreshItems}){

    const [value, setValue] = useState('');
    const [netto, setNetto] = useState(0);
    const [vat, setVat] = useState(23);
    const [brutto, setBrutto] = useState(0);


    const onVatEdit = function (val) {
        if (val != 0) {
            let nvat = (val/100 ) +1;
            let nnetto = (brutto / nvat).toFixed(2);
            setNetto(nnetto);
        }else{
            setNetto(brutto);
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

    const addItem = ()=>{
        if(value.length >= 3 && brutto != 0){
            API.post('/witems',{
                name:value,
                netto:netto,
                brutto:brutto,
                vat:vat
            }).then(res=>{
                refreshItems();
                modalToggle();
                setValue(''),
                setNetto(0),
                setBrutto(0);
                setVat(0)
            })
        }else{
            alert('Somethings goes wrong... Check your data and try again');
        }
    }

    return(
        <>
            <Modal isOpen={modalState} toggle={modalToggle}>
                <ModalHeader toggle={modalToggle}>
                    Dodawanie nowego przedmiotu do magazynu
                </ModalHeader>
                <ModalBody>
                <FormGroup>
                        <Label>Nazwa Przedmiotu</Label>
                        <Input name='name' placeholder='Nazwa przedmiotu' onChange={(e) => { setValue(e.target.value) }} value={value} />
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
                </ModalBody>
                <ModalFooter>
                    <Button color='success' onClick={()=>{addItem();}}>Zapisz</Button>
                    <Button color='danger' onClick={modalToggle}>Zamknij</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}