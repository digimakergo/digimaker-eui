import * as React from 'react';
import { RouteProps } from 'react-router';
import List from './List';
import MetaInfo from './MetaInfo';
import Actions from './Actions';

export default class Main extends React.Component<RouteProps,{content:any,list:any}> {

constructor(props:any) {
      super(props);
      this.state = {content:'',list : ''};
    }


fetchData(id){
fetch('http://demo.digimaker.no:8089/api/content/get/'+id )
         .then(res=>res.json())
         .then( (data) => {
           this.setState({content : data});
         } )   
}

componentWillReceiveProps(nextProps){
  this.fetchData(nextProps.match.params.id);
 }

componentWillMount(){
   this.fetchData(this.props.match.params.id);
  }

  render () {
    return (
       <div>
         <div className="path">{this.state.content.name}</div>
         <div className="side">
           <MetaInfo content={this.state.content} />
           <Actions content={this.state.content} />
         </div>
         <div className="list">
          <List id={this.props.match.params.id} />
         </div>
       </div>
    );
  }
}
