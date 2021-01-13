import * as React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { Accordion, Button } from 'react-bootstrap';

export default class MetaInfo extends React.Component<{content:any}> {




  render () {
    return (
         <div>
           <div>ID: {this.props.content.id}</div>
           <div>CID: {this.props.content.cid}</div>
           <div>Published: <Moment unix format="DD.MM.YYYY HH:mm">{this.props.content.published}</Moment></div>
           {this.props.content.version&&<div>Version: {this.props.content.version}</div>}
           <div>Status: <span className={"status-"+this.props.content.content_type+" status-"+this.props.content.status}></span></div>
           <div>UID: {this.props.content.uid}</div>
         </div>
    );
  }
}
