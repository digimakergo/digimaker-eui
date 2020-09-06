import * as React from 'react';
import {FetchWithAuth} from 'digimaker-ui/util';
import Browse from 'digimaker-ui/Browse';
import util from 'digimaker-ui/util';

export default class Move extends React.Component<{from:any, changed:boolean, selected?:any}, {operating:boolean,triggered:boolean}> {

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

  //close dialog
  close(){
    this.setState({triggered:false});
  }

  selectedTarget(target){
      if(target){
        this.setState({operating: true});
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + "/content/move/"+this.props.from.id+"/"+target.id)
            .then(res => res.text())
            .then((data) => {

            }).catch(err=>{
              this.setState(()=>{throw err});
            })
      }
  }

  render(){
    return <div>
        {this.state.operating&&<div>Loading...</div>}
        <Browse trigger={true} config={util.getConfig().browse} contenttype={"folder"} onConfirm={(target:any)=>{this.selectedTarget(target)}} />
        </div>

    return <div style={{background:'white',position:'fixed', left:'30%',top:'20%',width:'500px', height:'500px'}}>
    COPY {this.props.from?this.props.from.name:''}, {this.props.selected&&<span>{Object.keys(this.props.selected).map((value)=>{return value+', '})}</span>}
    <div>Please choose target:  <button className="btn btn-secondary" onClick={()=>this.close()}>Close</button>
    </div></div>
  }
}
