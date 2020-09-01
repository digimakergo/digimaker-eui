import * as React from 'react';
import {FetchWithAuth} from 'digimaker-ui/util';

export default class SetPriority extends React.Component<{from:any, afterAction:any}, {}> {
  private priortyStep = 100;

  constructor(props: any) {
      super(props);
  }


  removePriority(){
    let content = this.props.from;
    this.setPriority(content.id, 0);
  }

  setPriority(id:number, priority:number){
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/setpriority?params='+id+','+priority)
      .then((res:any)=>res.json())
      .then((data:any)=>{
          this.props.afterAction();
      });
  }

  setToTop(){
    let content = this.props.from;
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/list/'+content.content_type+'?parent='+content.parent_id+'&sortby=priority%20desc&limit=1&offset=0')
      .then((res:any)=>res.json())
      .then((data:any)=>{
        let priority = this.priortyStep;
        if( data.list.length > 0 ){
            let topPriority = data.list[0].priority;
            priority = topPriority+this.priortyStep;
        }
        this.setPriority( content.id, priority );
      });
  }

  render(){
    let priority = this.props.from.priority;
    return (<div>{priority!=0&&<span onClick={()=>this.removePriority()}><i className="fas fa-times"></i> Remove priority</span>}
                 {priority==0&&<span onClick={()=>this.setToTop()}><i className="fas fa-long-arrow-alt-up"></i> Set top priority</span>}</div>)
  }
}
