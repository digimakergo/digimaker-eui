import * as React from 'react';
import {FetchWithAuth} from 'digimaker-ui/util';
import util from 'digimaker-ui/util';
import Browse from 'digimaker-ui/Browse';


export default class AssignRole extends React.Component<{from:any, changed:boolean, selected?:any, afterAction?:any}, {triggered:boolean}> {

  constructor(props: any) {
      super(props);
      this.state = {triggered: props.changed};
  }

  //close dialog
  close(){
    this.setState({triggered:false});
  }

  selectedTarget(target){
    if( target ){
      FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/access/assign/8/'+target.cid)
          .then(res => res.text())
          .then((data) => {
            this.props.afterAction(true, false)
          }).catch(err=>{
          })
    }
  }

  render(){
    return <div>
            <Browse trigger={true} config={util.getConfig().browse} contenttype={["user"]} onConfirm={(target:any)=>{this.selectedTarget(target)}} />
          </div>
  }
}
