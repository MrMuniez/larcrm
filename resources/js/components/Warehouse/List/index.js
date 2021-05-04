import React,{useState,useEffect} from 'react';
import { Nav } from 'reactstrap';
import { NavItem } from 'reactstrap';
import { Button } from 'reactstrap';
import { Table } from 'reactstrap';
import API from '../../../API';
import WarehouseItemAddModal from '../Modals/WarehouseItemAddModal';
import WarehouseItemOrderAddModal from '../Modals/WarehouseItemOrderAddModal';


export default function WarehouseList(){

    const [items,setItems] = useState([]);
    const [itemAddModalState,setItemAddModalState] = useState(false);
    const [itemOrderAddModalState,setItemOrderAddModalState] = useState(false);
    const [addOrderItem,setAddOrderItem] = useState({});

    useEffect(()=>{
        getItems();
    },[]);

    const getItems = () =>{
        API.get('/witems').then(res=>{
            setItems(res.data);
        })
    }


    const makeOrder = (item)=>{
        setAddOrderItem(item);
        setItemOrderAddModalState(!itemOrderAddModalState);
    }

    return(
        <>
          <Nav className="border">
                <NavItem className="mr-auto" >

                </NavItem>
                <NavItem>
                    <Button color='primary' onClick={()=>{setItemAddModalState(!itemAddModalState)}}>
                        Dodaj Przedmiot
                    </Button>
                </NavItem>
            </Nav>
            {items.length > 0 ?
            <Table striped>
            <thead>
                <tr>
                    <td>Nazwa</td>
                    <td>Stan na magazynie</td>
                    <td>Netto</td>
                    <td>Stawka VAT</td>
                    <td>Brutto</td>
                    <td>___</td>
                </tr>
            </thead>
            <tbody>
                {items.map((val,i)=>{
                    return <tr key={i}>
                        <td>{val.name}</td>
                        <td>{val.amount}</td>
                        <td>{val.netto}</td>
                        <td>{val.vat}</td>
                        <td>{val.brutto}</td>
                        <td>
                            <Button onClick={()=>{makeOrder(val)}}>Załóż zamówienie</Button>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>:
        'Ni mo'}

        <WarehouseItemAddModal modalState={itemAddModalState} modalToggle={()=>{setItemAddModalState(!itemAddModalState)}} refreshItems={getItems}/>
        <WarehouseItemOrderAddModal modalState={itemOrderAddModalState} modalToggle={()=>{setItemOrderAddModalState(!itemOrderAddModalState)}} item={addOrderItem} />
        </>
    )
}