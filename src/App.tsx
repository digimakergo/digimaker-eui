import React from 'react';
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import './App.css';
import Main from './main/Main'
import Leftmenu from './leftmenu/Leftmenu'
import Create from './actions/Create'
import Edit from './actions/Edit'
import ViewVersion from './main/ViewVersion'
import Config from './Config'
import './Init'
import Registry from './ui/Registry'
import ContextProvider from './ContextProvider';

const App: React.FC = () => {
    var showSidemenu = false;

    return (
        <ContextProvider> {/*context between right and left area */}
        <Router>
            <Route>
            <div className="App">
                <Leftmenu />
                <div className="main">
                    <Route path="/main/:id" component={Main}  />
                    <Route path="/create/:parent/:contenttype" component={Create} />
                    <Route path="/edit/:id" component={Edit} />
                    <Route path="/version/:id/:version" component={ViewVersion} />
                    {Object.keys(Config.main).map((key)=>{
                        let identifier:string = Config.main[key];
                        const com:React.ReactType = Registry.getComponent(identifier);
                        return (<Route path={key} component={com} />)
                    })
                    }
                    <footer>
                      {/*Powered by Digimaker CMF. Implemented by Digimaker AS.  */}
                    </footer>
                </div>
            </div>
            </Route>
        </Router>
        </ContextProvider>
    );
}

export default App;
