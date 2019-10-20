import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Slidemenu extends React.Component<{show:boolean},{show:boolean}> {

constructor(props:any) {
      super(props);
      this.state = {show:props.show};
    }


componentDidUpdate(prevProps, prevState, snapshot)
{
    if( !this.state.show && !prevState.show && this.props.show ) {
        this.setState({show:true});
    }
}

slideOut(){
    this.setState({show:false});
}

  render () {
    return (
         <div className={"slidemenu"+(this.state.show?'':' hide')}>
            <ul>
                <li>
                   <a className="logo" onClick={()=>{this.slideOut();}}>
                    <img src="/images/logo.png" />
                   </a>
                </li>
                <li>
                  <a href="#" className="selected">
                  <i className="fas fa-desktop"></i>
                  <div>Sites</div>
                  </a>
                </li>
                <li>
                  <a href="#">
                  <i className="fas fa-users"></i>
                  <div>Users</div></a>
                </li>                

            </ul>
        </div>
    );
  }
}
