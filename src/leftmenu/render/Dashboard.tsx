import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
export default class Dashboard extends React.Component<{config:any},{data:any}> {

  render () {
    return (
         <div className="menuitem"><a href="#"><i className="far fa-folder" /> {this.props.config.name}</a></div>
    );
  }
}
