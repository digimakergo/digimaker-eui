import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Treemenu extends React.Component<{},{data:any}> {
  
constructor(props:any) {
      super(props);
this.state = {data : ''};
    }


  fetchData(){
   fetch('http://demo.digimaker.no:8089/api/content/treemenu/55' )
         .then(res=>res.json())
         .then( (data1) => {
           this.setState({data : data1});

         } )
  }

 componentWillMount(){
  this.fetchData();
 }

 renderNode(node: any): any{
   return( <li>
           <Link to={`/main/${node.id}`}>{node.name}</Link>
           <ul>{node.children?node.children.map((value)=>{ return this.renderNode( value ) }):''}</ul>
          </li> );
}


  render () {
    return (
         <ul className="treemenu">{this.state.data?this.renderNode(this.state.data):''} </ul>
    );
  }
}
