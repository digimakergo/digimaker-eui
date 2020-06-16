import * as React from 'react';
import {FetchWithAuth} from '../ui/util';

export default class Search extends React.Component<{},{}>{
  constructor(props: any) {
      super(props);
  }


  render(){
    return <div className="search">
      <input type="text" placeholder="Search" className="form-control" />
      <a href="#"><i className="fa fa-search"></i></a>
    </div>
  }
}
