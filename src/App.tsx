import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Config from './config.json';
import Treemenu from './Treemenu';
import Main from './main/Main'
import Leftmenu from './Leftmenu'
import Create from './actions/Create'

const App: React.FC = () => {
    var showSidemenu = false;

    return (
        <Router>
            <div className="App">
                <Leftmenu />
                <div className="main">
                    <Route path="/main/:id" component={Main} />
                    <Route path="/create/:parent/:contenttype" component={Create} />
                </div>
            </div>
        </Router>
    );
}

export default App;
