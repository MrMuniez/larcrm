import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import ItemTypeList from './ItemTypes/List';



export default function Settings(){
    let { path, url } = useRouteMatch();
    return (
        <>
        
            <Switch>
                <Route exact path={`${url}/`}>
                    <ItemTypeList />
                </Route>
                <Route exact path={`${url}/types`}>
                    <ItemTypeList />
                </Route>
            </Switch>
            
        </>
    )
}