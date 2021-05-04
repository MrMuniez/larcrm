import React,{useState} from 'react';
import {Link as RouterLink,
    Switch,
    Route,
    useRouteMatch,
    useParams } from 'react-router-dom';
import OrderAdd from './Add';
import OrderList from './List';
import OrderView from './View';

export default function Orders(){
    
    let { path, url } = useRouteMatch();
    return (
        <>
        
            <Switch>
                <Route exact path={`${url}/`}>
                    <OrderList />
                </Route>
                <Route exact path={`${url}/:orderID`}>
                    <OrderView />
                </Route>
                <Route exact path={`${url}/add/:clientID`}>
                    <OrderAdd />
                </Route>
            </Switch>
            
        </>
    )
}