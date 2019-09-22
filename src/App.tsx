import React from 'react';
import './App.css';
import Treemenu from './Treemenu';

const App: React.FC = () => {
  return (
    <div className="App">
       <div className="left"><Treemenu /></div>
       <div className="main">Digimaker</div>
    </div>
  );
}

export default App;
