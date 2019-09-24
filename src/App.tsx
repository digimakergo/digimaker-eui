import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Treemenu from './Treemenu';
import Main from './Main'

const App: React.FC = () => {
  return (
    <Router>
    <div className="App">
       <div className="left">
          <div><Link to="/1"><i className="far fa-folder" /> Dashboard</Link></div>
          <Treemenu />
       </div>
       <div className="main">
	 <Route path="/main/:id" component={Main} />
       </div>
    </div>
    </Router>
  );
}

export default App;
