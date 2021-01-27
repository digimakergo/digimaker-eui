import * as React from 'react';
import {FetchWithAuth} from 'digimaker-ui/util';
import Browse from 'digimaker-ui/Browse';
import util from 'digimaker-ui/util';

export default class Move extends React.Component<{content:any, from:any, changed:boolean, afterAction:any; selected?:any}, {operating:boolean,triggered:boolean}> {

  constructor(props: any) {
      super(props);
      this.state = {operating:false, triggered: props.changed};
  }

  //when it's changed, trigger it
  componentDidUpdate(prevProps, prevState, snapshot){
      if( prevProps.changed != this.props.changed ){
          this.setState({triggered: true});
      }
  }

  getContainerTypes(contenttype:string){
    //todo: use other way to get list since this one is not reliable
    let filterConfig = util.getConfig().browse.filter;
    let result = util.getSettings( filterConfig, contenttype ).contenttype;
    return result;
  }

  //close dialog
  close(){
    this.setState({triggered:false});
  }

  selectedTarget(target){
      if(target){
        this.setState({operating: true});
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + "/content/move/"+this.props.content.id+"/"+target.id)
            .then(res => res.text())
            .then((data) => {
              this.setState({operating: false});
              this.props.afterAction(true, false)
            }).catch(err=>{
              this.setState(()=>{throw err});
            })
      }
  }

  render(){
    return <div>
        {this.state.operating&&<div>Loading...</div>}
        <Browse trigger={true} config={util.getConfig().browse} contenttype={this.getContainerTypes(this.props.content.content_type)} onConfirm={(target:any)=>{this.selectedTarget(target)}} />
        </div>
  }
}
