import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Config from './config.json';
import Treemenu from './Treemenu';
import Main from './main/Main'
import Create from './actions/Create'

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <div className="left">
                    <div className="logomenu"> <a className="logo" href="#"><img src="http://demo.digimaker.no:9200/static/images/logo1.png" width="28px" /></a> <Link to="/1" className="profile"> <i className="fas fa-user"></i>&nbsp;Chen Xiongjie</Link></div>
                    <div className="menuitem"><Link to="/1"><i className="far fa-folder" /> Dashboard</Link></div>
                    <div className="menuitem"><a href="#" className="settings"> <i className="fas fa-wrench"></i> </a>
                        <Treemenu />
                    </div>
                </div>
                <div className="main">
                    <Route path="/main/:id" component={Main} />
                    <Route path="/create/:parent/:contenttype" component={Create} />
                </div>
            </div>
        </Router>
    );
}

export default App;
