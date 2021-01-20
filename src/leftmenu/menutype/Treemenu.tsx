import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { FetchWithAuth } from 'digimaker-ui/util';
import ReactTooltip from "react-tooltip";
import Select from 'react-select';
import TreeNode from 'digimaker-ui/TreeNode';
import { Collapse } from 'react-bootstrap';

export default class Treemenu extends React.Component<{ config: any, current:any }, { open:boolean, data: any }> {

  constructor(props: any) {
    super(props);
    this.state = { open: props.config.open?true:false, data: '' };
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
    let isOpen = this.state.open;

    let selectedId:any = 0;
    if( this.props.current ){
       let hierarchy = this.props.current.hierarchy;
       if( hierarchy ){
          selectedId = this.props.current.hierarchy.split('/');
          for( let i=0; i<selectedId.length; i++ ){
            selectedId[i] = parseInt( selectedId[i] );
          }
       }
    }

    return (
      this.state.data && <div className="menuitem">
          <div className="menuitem-head">
            <NavLink to={`/main/${this.state.data.id}`} activeClassName="selected">
              <i className={this.props.config.icon}></i> {this.state.data.name}
            </NavLink>

            <span className="right">
            {this.props.config.is_site &&
              <a className="select-site" href="#" data-tip="Site list"><i className="fas fa-list"></i></a>}
              <a href="#" onClick={(e:any)=>{e.preventDefault();this.setState({open:!this.state.open})}}>
                <i className={"foldable fas fa-chevron-right"+(this.state.open?' open':'')}>
              </i></a>
              <ReactTooltip effect="solid" />
            </span>
          </div>

          <Collapse in={isOpen}>
            <div className="menuitem-content">
              <TreeNode selectedId={selectedId} data={this.state.data} />
            </div>
          </Collapse>
      </div>
    );
  }
}
