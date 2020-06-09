import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { FetchWithAuth } from '../../utils/util';
import ReactTooltip from "react-tooltip";
import Select from 'react-select';
import TreeNode from '../../ui/TreeNode';
import { Accordion } from 'react-bootstrap';
import {IconToggle} from '../../ui/IconToggle';

export default class Treemenu extends React.Component<{ config: any }, { data: any }> {

  constructor(props: any) {
    super(props);
    this.state = { data: '' };
  }

  fetchData() {
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/treemenu/' + this.props.config.root + '?type='+this.props.config.contenttype.join(','))
      .then(res => res.json())
      .then((data) => {
        this.setState({ data: data });
      })

  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      this.state.data && <div className="menuitem">
          <Accordion defaultActiveKey={this.props.config.is_site?"1":"0"}>
          <div className="menuitem-head">
            <NavLink to={`/main/${this.state.data.id}`} activeClassName="selected">
              <i className={this.props.config.icon}></i> {this.state.data.name}
            </NavLink>

            <span className="right">
            {this.props.config.is_site &&
              <a className="select-site" href="#" data-tip="Site list"><i className="fas fa-list"></i></a>}
              <IconToggle eventKey="1" className="fas fa-chevron-right" open={this.props.config.is_site?true:false} />
              <ReactTooltip effect="solid" />
            </span>
          </div>

          <Accordion.Collapse eventKey="1" className="menuitem-content">
            <TreeNode data={this.state.data} />
          </Accordion.Collapse>
        </Accordion>
      </div>
    );
  }
}
