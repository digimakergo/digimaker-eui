import React, { Component, useState } from 'react';
import { Switch, BrowserRouter as Router, Route, Link, useLocation, Redirect } from "react-router-dom";
import queryString from 'query-string';
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
import DMInit from 'digimaker-ui/DMInit'
import ContextProvider from './ContextProvider';
import ErrorBoundary from './ErrorBoundary';
import {Permission} from './leftmenu/Permission'

const App: React.FC = () => {

    util.setConfig( Config );
    util.setCookieKey("dm_eui"); //todo: use .env?
    const errorMessage ='No access to view';

    //with priorized urls, it does redirection. first url which is not empty will be redirected.
    const commonAfterAction = (history:any, status:number, urls:Array<any>)=>{
        for( let url of urls ){
           if( url ){
             history.push( url );
             break;
           }
        }
    };

    const getFromParam = (location:string)=>{
      let params = queryString.parse(location);
      return params['from'];
    };

    return (
        <ContextProvider> {/*context between right and left area */}
        <ErrorBoundary>
        <Router>
          <Switch>
            <Route path="/login" component={Login}  />
            <Route path="/logout" component={Logout}  />
            <Route>
            <div className="App">
                <DMInit>
                  <Redirect from="/" to={Config['default_url']} />
                <Leftmenu />
                <div className="main">
                    <Route path="/main/:id" exact render={route=><Main id={route.match.params.id} />} />
                    <Route path="/main/:contenttype/:id" exact render={route=><Main id={route.match.params.id} contenttype={route.match.params.contenttype} />} />
                    <Route path="/create/:parent/:contenttype" render={route=><Create key={Date.now()} parent={route.match.params.parent} contenttype={route.match.params.contenttype} afterAction={(status)=>commonAfterAction( route.history, status, ['/main/' + route.match.params.parent] )} />} />
                    <Route path="/edit/:contenttype/:id" exact render={route=><Edit id={route.match.params.id} contenttype={route.match.params.contenttype} afterAction={(status, params)=>commonAfterAction(route.history,status, [getFromParam(route.location.search), '/main/'+route.match.params.contenttype+'/'+route.match.params.id])} />} />
                    <Route path="/edit/:id" exact render={route=><Edit id={route.match.params.id} afterAction={(status, params)=>commonAfterAction(route.history,status, [getFromParam(route.location.search), '/main/'+route.match.params.id])} />} />
                    <Route path="/version/:id/:version" component={ViewVersion} />
                    {/*Register configable routes*/}
                    <React.Suspense fallback="...">
                    {Object.keys(Config.routes).map((key:any)=>{
                        let identifier:string = Config.routes[key];
                        const com = Registry.getComponent(identifier);
                        console.debug('Registering route: '+ key+' with component ' + identifier);
                        return (<Route key={key} path={key} component={com} />)
                    })
                    }
                    </React.Suspense>
                    <footer>
                      Powered by <a href="http://www.digimaker.com" target="_blank"><img src={process.env.PUBLIC_URL+"/logo.png"} height="18px" />&nbsp;Digimaker CMF</a>
                    </footer>
                </div>
                </DMInit>
            </div>
            </Route>
        </Switch>
        </Router>
        </ErrorBoundary>
        </ContextProvider>
    );
}

export default App;
