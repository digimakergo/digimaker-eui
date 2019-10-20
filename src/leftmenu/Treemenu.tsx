import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Config from '../config.json';
export default class Treemenu extends React.Component<{},{data:any}> {

constructor(props:any) {
      super(props);
      this.state = {data : ''};
    }


  fetchData(){
   fetch(process.env.REACT_APP_REMOTE_URL+'/content/treemenu/3' )
         .then(res=>res.json())
         .then( (data1) => {
           this.setState({data : data1});

         } )
  }

 componentWillMount(){
  this.fetchData();
 }

 renderNode(node: any): any{
   return( <li><a href="#" className="expand">{node.children?<i className="fas fa-chevron-down"></i>:''}</a>
           <Link to={`/main/${node.id}`}><i className="far fa-folder"></i> {node.name}</Link>
           <ul>{node.children?node.children.map((value)=>{ return this.renderNode( value ) }):''}</ul>
          </li> );
}


  render () {
    return (
         <ul className="treemenu">{this.state.data?this.renderNode(this.state.data):''}</ul>
    );
  }
}
