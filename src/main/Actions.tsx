import * as React from 'react';
import Config from '../dm.json';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import util from '../utils/util';

export default class Actions extends React.Component<{content:any}> {

  render () {
    let content = this.props.content;
    var type = content.content_type;
    var newTypes = [];
    var actions = [];
    let mainConfig = Config.main[type];
    if( type && mainConfig )
    {
        newTypes = mainConfig["new"];
        actions = mainConfig["actions"];
    }

    let variables = content; //can support more attribute also.

    return (
       <div className="tool-block">
         <div className="block-title">Actions</div>
         <div className="block-body">
            {newTypes&&
             <div>
             <i className="fas fa-plus"></i> Create &nbsp;
             {newTypes.map((value)=>{return (
                 <Link to={`/create/${this.props.content.id}/${value}`} title={value}>
                     <i className={"icon icon-"+value}></i> &nbsp;
                 </Link>
                )})}
             </div>
            }
         <hr />

            {actions&&actions.map( (value:any) => {
                let path = util.washVariables(value.link, variables); //todo: support component here also
                return (<div>
                         <Link to={path} title={value.title}><i className="fas fa-tools"></i> {value.name}</Link>
                        </div>)
                } )}

         </div>
       </div>
    );
  }
}
