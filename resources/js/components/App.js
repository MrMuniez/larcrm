import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import {
    HashRouter,
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Container } from 'reactstrap';

import Header from '../StaticComponents/Header';
import Clients from './Clients';
import Main from './Main';
import Orders from './Orders';
import Settings from './Settings';
import Warehouse from './Warehouse';
  
function App() {
    return (
        <>
        <Router>
            <Header />

            <Container fluid={true}>
                <Switch>
                    <Route path="/orders">
                        <Orders />
                    </Route>
                    <Route path="/clients">
                        <Clients />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="/warehouse">
                        <Warehouse />
                    </Route>
                    <Route path='/'>
                        <Main />
                    </Route>
                   
                </Switch>
            </Container>
        </Router>
        </>
        
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
