import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Config from './config.json';
import Slidemenu from './Slidemenu'
import Treemenu from './Treemenu'

export default class Leftmenu extends React.Component<{},{showSidemenu:boolean}> {

constructor(props:any) {
      super(props);
      this.state = {showSidemenu:false};
    }

  showSide(){
      this.setState({showSidemenu:true});
  }

  render () {
    return (
        <div className="left">
            <Slidemenu show={this.state.showSidemenu} />
            <div className="logomenu">
            <a className="logo" href="#" onClick={()=>{this.showSide();}}>
                <img src="/images/logo.png" width="28px" />
            </a>
            <Link to="/1" className="profile"> <i className="fas fa-user"></i>&nbsp;Chen Xiongjie</Link></div>
            <div className="menuitem"><Link to="/1"><i className="far fa-folder" /> Dashboard</Link></div>
            <div className="menuitem"><a href="#" className="settings"> <i className="fas fa-wrench"></i> </a>
                <Treemenu />
            </div>
        </div>
    );
  }
}
