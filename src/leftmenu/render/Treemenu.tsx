import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
export default class Treemenu extends React.Component<{config:any},{data:any}> {

constructor(props:any) {
      super(props);
      this.state = {data : ''};
    }


  fetchData(){
   fetch(process.env.REACT_APP_REMOTE_URL+'/content/treemenu/'+this.props.config.root )
         .then(res=>res.json())
         .then( (data1) => {
           this.setState({data : data1});

         } )
  }

 componentDidMount(){
  this.fetchData();
 }

 renderNode(node: any): any{
   return( <li><a href="#" className="expand">{node.children?<i className="fas fa-chevron-down"></i>:''}</a>
           <NavLink to={`/main/${node.id}`} activeClassName="selected"><i className="far fa-folder"></i> {node.name}</NavLink>
           <ul>{node.children?node.children.map((value)=>{ return this.renderNode( value ) }):''}</ul>
          </li> );
}


  render () {
    return (
         <ul className="treemenu">{this.state.data?this.renderNode(this.state.data):''}</ul>
    );
  }
}
