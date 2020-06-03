import * as React from 'react';
import Config from '../dm.json';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import util from '../utils/util';
import { Accordion, Button } from 'react-bootstrap';
import {IconToggle} from '../ui/IconToggle';


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
         <div >
            {newTypes&&
             <div className="action-create">
              <div>Create content</div>
             <div>
             {newTypes.map((value)=>{return (
                 <Link to={`/create/${this.props.content.id}/${value}`} data-tip={value}>
                     <i className={"icon icon-"+value}></i> &nbsp;
                 </Link>
                )})}
              </div>
              <ReactTooltip effect="solid" />
             </div>
            }

            <div className="side-actions">
            {newTypes&&<hr />}

            {actions&&actions.map( (value:any) => {
                let path = util.washVariables(value.link, variables); //todo: support component here also
                return (<div>
                         <Link to={path} title={value.title}>
                         <i className={value.icon?("icon "+value.icon):("fas fa-tools")}></i> {value.name}</Link>
                        </div>)
                } )}
                </div>
         </div>
    );
  }
}
