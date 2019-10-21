import React from 'react';
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import './App.css';
import Main from './main/Main'
import Leftmenu from './leftmenu/Leftmenu'
import Create from './actions/Create'
import Config from './Config'
import './Init'
import Registry from './ui/Registry'

const App: React.FC = () => {
    var showSidemenu = false

    return (
        <Router>
            <Route>
            <div className="App">
                <Leftmenu />
                <div className="main">
                    <Route path="/main/:id" component={Main} />
                    <Route path="/create/:parent/:contenttype" component={Create} />
                    {Object.keys(Config.main).map((key)=>{
                        let identifier:string = Config.main[key];
                        const com:React.ReactType = Registry.getComponent(identifier);
                        return (<Route path={key} component={com} />)
                    })
                    }
                </div>
            </div>
            </Route>
        </Router>
    );
}

export default App;
