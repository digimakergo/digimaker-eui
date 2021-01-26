import * as React from 'react';
import {FetchWithAuth} from 'digimaker-ui/util';
import util from 'digimaker-ui/util';
import Browse from 'digimaker-ui/Browse';
import {Dialog} from 'digimaker-ui/util';



export default class UnassignRole extends React.Component<{from:any, changed:boolean, selected?:any, afterAction?:any}, {showConfirm:boolean}> {
  constructor(props: any) {
      super(props);
      this.state ={showConfirm: true};
  }


  close(){
    this.setState({showConfirm: false});
  }

  submit(){
      let selected = this.props.selected;
      FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/access/unassign/'+selected.cid+'/'+selected.role_id)
          .then(res => res.text())
          .then((data) => {
            this.close();
            this.props.afterAction(true, false)
          }).catch(err=>{
          })
  }

  render(){
    return <Dialog title="Delete" body={"Confirm to unassign "+this.props.selected.name + "?"}
    submit={()=>this.submit()}
    isShowing={this.state.showConfirm}
    hide={()=>this.close()} />;
  }
}
