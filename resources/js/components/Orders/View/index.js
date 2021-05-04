import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { UncontrolledDropdown } from 'reactstrap';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';

import API from '../../../API';
import OrderItemAddModal from './Modals/OrderItemAddModal';
import OrderRepairAddModal from './Modals/OrderRepairAddModal';
import OrderViewInfo from './ViewInfo';
import OrderViewItems from './ViewItems';
import OrderViewRepairs from './ViewRepairs';


export default function OrderView(props) {

    const { orderID } = useParams();
    const [order, setOrder] = useState(false);
    const [activeBox, setActiveBox] = useState('info');
    const [repairStates,setRepairStates] = useState([]);

    const [repairAddModalState,setRepairAddModalState] = useState(false);
    const [itemAddModalState,setItemAddModalState] = useState(false);

    useEffect(() => {
        API.get(`/orders/${orderID}`).then(res => {
            if (res.status === 200) {
                setOrder(res.data);
            } else {
                alert('something goes wrong...');
            }
        });
        API.get('/repairstates').then(res=>{
            setRepairStates(res.data);
        })
    }, []);


    const refreshOrder = ()=>{
        API.get(`/orders/${orderID}`).then(res => {
            if (res.status === 200) {
                setOrder(res.data);
            } else {
                alert('something goes wrong...');
            }
        });
    }

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink onClick={()=>{setActiveBox('info')}} active={activeBox=='info' ? true : false}> Ogólne</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={()=>{setActiveBox('repairs')}} active={activeBox=='repairs' ? true : false}>Naprawy</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={()=>{setActiveBox('items')}} active={activeBox=='items' ? true : false}>Przemioty</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={()=>{setActiveBox('finances')}} active={activeBox=='finances' ? true : false}>Fundusze</NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                    <DropdownToggle nav caret>
                        Akcje
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=>{setRepairAddModalState(!repairAddModalState)}}>Dodaj naprawe</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Nav>
            {activeBox=='info' ? <OrderViewInfo order={order} repairStates={repairStates} refreshOrder ={refreshOrder}/>: false}
            {activeBox=='repairs' ? <OrderViewRepairs order={order}  refreshOrder ={refreshOrder}/> : false}
            {activeBox=='items' ? <OrderViewItems order={order}  refreshOrder ={refreshOrder}/> : false}

            <OrderRepairAddModal modalToggle={()=>{setRepairAddModalState(!repairAddModalState)}} modalState={repairAddModalState}  order={order} refreshOrder ={refreshOrder}/>
            <OrderItemAddModal modalToggle={()=>{setItemAddModalState(!itemAddModalState)}} modalState={itemAddModalState} order={order} refreshOrder={refreshOrder} />
        </div>
    );
}