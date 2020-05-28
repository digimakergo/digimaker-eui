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
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/treemenu/' + this.props.config.root)
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
          <Accordion defaultActiveKey="0">
          <div>
            <NavLink to={`/main/${this.state.data.id}`} activeClassName="selected">
              <i className={this.props.config.icon}></i> {this.state.data.name}
            </NavLink>

            <span className="right">
            {this.props.config.is_site &&
              <a className="select-site" href="#" data-tip="Site list"><i className="fas fa-list"></i> &nbsp; </a>}
            <IconToggle className="fas fa-chevron-right" />
            </span>
          </div>
          <ReactTooltip effect="solid" />

          <Accordion.Collapse eventKey="0">
            <TreeNode data={this.state.data} />
          </Accordion.Collapse>
        </Accordion>
      </div>
    );
  }
}
