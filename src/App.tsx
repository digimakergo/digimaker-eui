import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import './App.css';
import Main from './main/Main'
import Leftmenu from './leftmenu/Leftmenu'
import Login from './user/Login'
import Logout from './user/Logout'
import Create from './actions/Create'
import Edit from './actions/Edit'
import ViewVersion from './main/ViewVersion'
import Config from './dm.json'
import './Init'
import Registry from './ui/Registry'
import ContextProvider from './ContextProvider';
import ErrorBoundary from './ErrorBoundary';
import {Permission} from './leftmenu/Permission'

const App: React.FC = () => {
    var showSidemenu = false;

    const errorMessage ='No access to view';

    return (
        <ContextProvider> {/*context between right and left area */}
        <ErrorBoundary>
        <Router>
          <Switch>
            <Route path="/login" component={Login}  />
            <Route path="/logout" component={Logout}  />
            <Route>
            <div className="App">
                <Leftmenu />
                <div className="main">
                    <Route path="/main/:id" component={Main}/>
                    <Route path='/dashboard' component={<Permission access={"/dashboard"} error={errorMessage}><Main/></Permission>}/>
                    <Route path="/create/:parent/:contenttype" component={<Permission access={"/create/:parent/:contenttype"} error={errorMessage}><Create/></Permission>} />
                    <Route path="/edit/:id" component={<Permission access={"/edit/:id"} error={errorMessage}><Edit/></Permission>} />
                    <Route path="/version/:id/:version" component={<Permission access={"/version/:id/:version"} error={errorMessage}><ViewVersion/></Permission>} />
                    {/*Register configable routes*/}
                    {Object.keys(Config.routes).map((key)=>{
                        let identifier:string = Config.routes[key];
                        const com:React.ReactType = Registry.getComponent(identifier);
                        console.debug('Registering route: '+ key+' with component ' + identifier);
                        return (<Route path={key} component={com} />)
                    })
                    }
                    <footer>
                      Powered by <a href="http://www.digimaker.com" target="_blank"><img src="/logo.png" height="18px" />&nbsp;Digimaker CMF</a>
                    </footer>
                </div>
            </div>
            </Route>
        </Switch>
        </Router>
        </ErrorBoundary>
        </ContextProvider>
    );
}

export default App;
