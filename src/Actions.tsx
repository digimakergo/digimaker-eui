import * as React from 'react';
import Config from './config.json';
import Moment from 'react-moment';

export default class Actions extends React.Component<{content:any}> {




  render () {
    var type = this.props.content.content_type;
    var newTypes = [];
    var actions = [];
    if( type )
    {
        newTypes = Config.main[type]["new"];
        actions = Config.main[type]["actions"];
    }

    return (
       <div className="tool-block">
         <div className="block-title">Actions</div>
         <div className="block-body">
            {newTypes.length>0?
             <div>
             <i className="fas fa-plus"></i> Create &nbsp;
             {newTypes.map((value)=>{return (
                 <a href="#" title={value}>
                     <i className="far fa-folder"></i> &nbsp;
                 </a>
                )})}
             </div>:''
            }
         <hr />

            {actions.map( (value) => {
                return (<div>
                 <a href="#"><i className="fas fa-tools"></i> {value}</a>
                </div>)

                } )}

<hr />
<div>
             <a href="#"><i className="fas fa-tools"></i> Sync with clusers</a>
            </div>

         </div>
       </div>
    );
  }
}
