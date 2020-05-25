import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { FetchWithAuth } from '../../utils/util';
import TreeNode from '../../ui/TreeNode';

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
        <div>
          <NavLink to={`/main/${this.state.data.id}`} activeClassName="selected">
            <i className={this.props.config.icon}></i> {this.state.data.name}
          </NavLink>
          {this.props.config.is_site && <span className="right">
            <a href="" title="Select site"><i className="fas fa-wrench"></i></a>&nbsp;</span>}
        </div>
        <TreeNode data={this.state.data} />
      </div>
    );
  }
}
