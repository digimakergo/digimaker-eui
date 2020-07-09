import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import { RouteProps } from 'react-router';
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
import util from 'digimaker-ui/util'
import Registry from 'digimaker-ui/Registry'
import ContextProvider from './ContextProvider';
import ErrorBoundary from './ErrorBoundary';
import {Permission} from './leftmenu/Permission'

const App: React.FC = () => {
    var showSidemenu = false;

    util.setConfig( Config );
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
                    <Route path="/main/:id" strict render={route=><Main id={route.match.params.id} />} />
                    <Route path="/main/:contenttype/:id" strict render={route=><Main id={route.match.params.id} contenttype={route.match.params.contenttype} />} />
                    <Route path="/create/:parent/:contenttype" component={Create} />
                    <Route path="/edit/:id" strict render={route=><Edit id={route.match.params.id} />} />
                    <Route path="/edit/:contenttype/:id" strict render={route=><Edit id={route.match.params.id} contenttype={route.match.params.contenttype} />} />
                    <Route path="/version/:id/:version" component={ViewVersion} />
                    {/*Register configable routes*/}
                    {Object.keys(Config.routes).map((key:any)=>{
                        let identifier:string = Config.routes[key];
                        const com:React.ComponentClass<any, any> = Registry.getComponent(identifier);
                        console.debug('Registering route: '+ key+' with component ' + identifier);
                        return (<Route key={key} path={key} component={com} />)
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
