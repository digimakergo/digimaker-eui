import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { FetchWithAuth } from 'digimaker-ui/util';
import ReactTooltip from "react-tooltip";
import Select from 'react-select';
import TreeNode from 'digimaker-ui/TreeNode';
import { Collapse } from 'react-bootstrap';

export default class Treemenu extends React.Component<{ config: any, current:any }, { current:any, open:boolean, data: any }> {

  constructor(props: any) {
    super(props);
    this.state = { current:'',open: props.config.open?true:false, data: '' };
  }

  fetchData() {
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/treemenu/' + this.props.config.root + '?type='+this.props.config.contenttype.join(','))
      .then((data) => {
        if( data.error === false ){
          this.setState({ data: data.data });
        }
      })
  }

  componentDidMount() {
    this.fetchData();
    this.setState({current: this.props.current});
  }

  treenodeChange(e, data){
    this.setState({current: data});
  }

  render() {
    let isOpen = this.state.open;

    let selectedId:any = 0;
    if( this.state.current ){
       let hierarchy = this.state.current.hierarchy;
       if( hierarchy ){
          let selectedIdStrArray = hierarchy.split('/');
          let selectedIdArray:Array<number> = [];
          for( let i=0; i<selectedIdStrArray.length; i++ ){
            selectedIdArray[i] = parseInt( selectedIdStrArray[i] );
          }
          selectedId = selectedIdArray;
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
              <TreeNode selectedId={selectedId} data={this.state.data} onClick={(e, data)=>this.treenodeChange(e, data)} />
            </div>
          </Collapse>
      </div>
    );
  }
}
