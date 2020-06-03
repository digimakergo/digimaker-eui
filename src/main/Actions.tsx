import * as React from 'react';
import Config from '../dm.json';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import util from '../utils/util';
import Registry from '../ui/Registry';
import { Accordion, Button } from 'react-bootstrap';
import {IconToggle} from '../ui/IconToggle';


export default class Actions extends React.Component<{content:any, actionsConfig:any}> {

  //render link
  renderLink(config:any){
    let content = this.props.content;
    let variables = content; //can support more attribute also.
    let path = util.washVariables(config.link, variables); //todo: support component here also
    return (<div>
             <Link to={path} title={config.title}>
             <i className={config.icon?("icon "+config.icon):("fas fa-tools")}></i> {config.name}</Link>
            </div>)
  }


  render () {
    let content = this.props.content;
    let actions = this.props.actionsConfig;

    if( !actions ){
      return '';
    }

    return (actions.map( (actionConfig:any) => {
                if(actionConfig['link']){
                  return this.renderLink(actionConfig);
                }else if(actionConfig['com']){
                  return <Action config={actionConfig} content={content} />;
                }else{
                  return '';
                }
              }));
  }
}


class Action extends React.Component<{content:any, config:any}, {clickFlag:boolean}>{
  constructor(props: any) {
      super(props);
      this.state={clickFlag:false};
  }

  //render action component
  render(){
        let config = this.props.config;
        let Com:React.ReactType = Registry.getComponent( config['com'] );
        if(config.name){
          return <div>
                   <a href='#' title={config.title} onClick={(e)=>{e.preventDefault();this.setState({clickFlag:!this.state.clickFlag})}}>
                    <i className={config.icon?("icon "+config.icon):("fas fa-tools")}></i> {config.name}
                   </a>
                  <Com content={this.props.content} changed={this.state.clickFlag}/>
                 </div>
        }
  }
}
