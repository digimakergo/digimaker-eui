import * as React from 'react';
import {FetchWithAuth} from 'digimaker-ui/util';
import Browse from 'digimaker-ui/Browse';
import util from 'digimaker-ui/util';

export default class Move extends React.Component<{content:any, from:any, counter:number, afterAction:any; selected?:any}, {operating:boolean}> {

  constructor(props: any) {
      super(props);
      this.state = {operating:false};
  }

  getContainerTypes(contenttype:string){
    //todo: use other way to get list since this one is not reliable
    let filterConfig = util.getConfig().browse.filter;
    let result = util.getSettings( filterConfig, contenttype ).contenttype;
    return result;
  }

  selectedTarget(target){
      if(target){
        this.setState({operating: true});
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + "/content/move/"+this.props.content.id+"/"+target.id)
            .then((data) => {
              if( data.error === false ){
                this.setState({operating: false});
                this.props.afterAction(true, false)
              }
            })
      }
  }

  render(){
    return <div>
        {this.state.operating&&<div>Loading...</div>}
        <Browse key={this.props.counter} trigger={true} config={util.getConfig().browse} contenttype={this.getContainerTypes(this.props.content.content_type)} onConfirm={(target:any)=>{this.selectedTarget(target)}} />
        </div>
  }
}
