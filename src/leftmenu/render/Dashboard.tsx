import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
export default class Dashboard extends React.Component<{},{data:any}> {

  render () {
    return (
         <a href="#"><i className="far fa-folder" /> Dashboard</a>
    );
  }
}
