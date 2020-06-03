import * as React from 'react';
import Moment from 'react-moment';
import Config from '../dm.json';
import Create from '../actions/Create';
import util from '../utils/util';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class ListRowActions extends React.Component<{content:any,config:any}, {menuShown:boolean}> {
  constructor(props: any) {
      super(props);
      this.state={menuShown:false};
  }

  click(e:any){
    e.preventDefault();
    this.setState({menuShown:!this.state.menuShown});
  }

  render(){
    let config = this.props.config;

    if(!config){
      return '';
    }

    return <div>
    <a href="#" className="action" title="Actions" onClick={(e)=>this.click(e)}><i className="fas fa-ellipsis-h"></i></a>
    <div className={'action-menu '+(this.state.menuShown?'':'hide')}>
      {config.map((action:any) =>{
          let variables = this.props.content;
          let path = util.washVariables(action.link, variables);
          return (<div><Link to={path} className="action"><i className={action.icon}></i>&nbsp;{action.name}</Link></div>)
        })}
    </div>
    </div>
  }
}
