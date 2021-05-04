import React from 'react';
import {Link as RouterLink,
    Switch,
    Route,
    useRouteMatch,
    useParams } from 'react-router-dom';
import ClientAdd from './Add';
import ClientEdit from './Edit';
import ClientsList from './List';
import ClientView from './View';

export default function Clients(){
    
    let { path, url } = useRouteMatch();
    return (
        <>
        
            <Switch>
                <Route exact path={`${url}/`}>
                    <ClientsList />
                </Route>
                {/* <Route exact path={`${url}/:clientID`}>
                    <ClientView />
                </Route> */}
                <Route exact path={`${url}/add`}>
                    <ClientAdd/>
                </Route>
                <Route exact path={`${url}/edit/:clientID`}>
                    <ClientEdit />
                </Route>
            </Switch>
            
        </>
    )
}