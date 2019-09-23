import * as React from 'react';
import { RouteProps } from 'react-router';
import List from './List';

export default class Main extends React.Component<RouteProps,{content:any,list:any}> {

constructor(props:any) {
      super(props);
      this.state = {content:'',list : ''};
    }


  render () {
    return (
       <div><List id={this.props.match.params.id} /></div>
    );
  }
}
