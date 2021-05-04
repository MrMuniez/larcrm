import React from 'react';
import {
    Link as RouterLink,
    Switch,
    Route,
    useRouteMatch,
    useParams
} from 'react-router-dom';
import WarehouseList from './List';


export default function Warehouse() {
    let { path, url } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${url}/`}>
                    <WarehouseList />
                </Route>
                
            </Switch>
        </>
    )
}