import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { FetchWithAuth } from 'digimaker-ui/util';
import { Accordion } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';

export default class Listmenu extends React.Component<{ config: any }, { open:boolean, data: any }> {

  constructor(props: any) {
    super(props);
    this.state = { open: props.config.open?true:false, data: '' };
  }

  fetchData() {
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/list/folder?parent='+this.props.config.root)
      .then(res => res.json())
      .then((data) => {
        this.setState({ data: data.list });
      })

  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      this.state.data && <div className="menuitem">
          <div className="menuitem-head">
            <a href="#"><i className={this.props.config.icon}></i> {this.props.config.name}</a>
            <div className="right">
              <a href="#" onClick={(e:any)=>{e.preventDefault(); this.setState({open:!this.state.open})}}>
                <i className={"foldable fas fa-chevron-right"+(this.state.open?' open':'')}></i>
              </a>
            </div>
            </div>
          <Collapse in={this.state.open}>
            <div className="menuitem-content">
            <ul className="listmenu">
            {this.state.data.map((item)=>{
              return <li><NavLink to={'/main/'+item.id}><i className={"nodeicon far icon-" + item.content_type + " " + item.folder_type}></i>{item.name}</NavLink></li>
            })}
            </ul>
            </div>
          </Collapse>
      </div>
    );
  }
}
