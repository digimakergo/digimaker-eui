
import * as React from 'react';
import {ContentContext} from './Context';


export default class ContextProvider extends React.Component<{}, {data:string}> {

    constructor(props: any) {
        super(props);
        this.state = { data: '' };
    }



    render(){
      return (<ContentContext.Provider value={{data:this.state.data, update:(value)=>{this.setState({data: value})}}}>
                {this.props.children}
              </ContentContext.Provider>)
    }
}
