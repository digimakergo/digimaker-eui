import * as React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { Accordion, Button } from 'react-bootstrap';
import {IconToggle} from '../ui/IconToggle';

export default class MetaInfo extends React.Component<{content:any}> {




  render () {
    return (
       <div className="tool-block">
        <Accordion defaultActiveKey="0">
         <div className="block-title">Metainfo
         <span className="right">
           <IconToggle className="fas fa-chevron-right" />
         </span>
         </div>
         <div className="block-body">
        <Accordion.Collapse eventKey="0">
         <div>
         <div>ID: {this.props.content.id}</div>
         <div>CID: {this.props.content.cid}</div>
         <div>Name: {this.props.content.name}</div>
         <div>Author: <Link to={"/main/"+this.props.content.author}>{this.props.content.author_name}</Link></div>
         <div>Published: <Moment unix format="DD.MM HH:mm">{this.props.content.published}</Moment></div>
         <div>Modified: <Moment unix format="DD.MM HH:mm">{this.props.content.modified}</Moment></div>
         <div>Version: {this.props.content.version}</div>
         <div>Status: <span className={"status-"+this.props.content.content_type+" status-"+this.props.content.status}></span></div>
         <div>UID: {this.props.content.uid}</div>
         </div>
          </Accordion.Collapse>
         </div>
        </Accordion>
       </div>
    );
  }
}
