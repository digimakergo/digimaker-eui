import * as React from 'react';
import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip';

export default class Number extends React.Component<{definition:any, validation:any, beforeField:any, afterField:any, data:any, mode:string},{selected:boolean}> {

constructor(props:any) {
      super(props);
      this.state = {selected:false};
    }

    view(){
      const BeforeElement:React.ReactType = this.props.beforeField();
      const AfterElement:React.ReactType = this.props.afterField();
      return (<div className={'view field ' + this.props.definition.type }>
              {BeforeElement}
              <label>{this.props.definition.name}: </label>
              <div className="field-value">{this.props.data&&this.props.data.Raw}</div>
              {AfterElement}
              </div>)
    }

    componentDidMount() {
    if (this.props.data=="0"||this.props.data=="1") {
      this.setState({
          selected: true
      });
    }
  }

    onChange( e:any ){
      this.setState({selected: true});
    }

    edit(){
      const BeforeElement:React.ReactType = this.props.beforeField();
      const AfterElement:React.ReactType = this.props.afterField();
      const def = this.props.definition;
      const name = def.identifier;
      return (
          <div className={'edit field '+def.type+ ' ' +(this.props.definition.required?'required':'')+(this.props.validation=='1'?' result-required':'')}>
              {BeforeElement}
              <label htmlFor={this.props.definition.identifier}>{this.props.definition.name}
                  {this.props.definition.description&&<i className="icon-info" data-for={this.props.definition.identifier+'-desciption'} data-tip=""></i>}
                  {this.props.definition.description&&<ReactTooltip id={this.props.definition.identifier+'-desciption'} effect="solid" place="right" html={true} clickable={true} multiline={true} delayHide={500} className="tip">{this.props.definition.description}</ReactTooltip>}
              :</label>
              <div>
              {this.props.validation&&<div className="error">{this.props.validation}</div>}
                <label>
                  <input type="radio" defaultChecked={this.props.data=="1"} name={name} onChange={(e)=>this.onChange(e)} value="1" />
                  <span>{def.parameters.options[0]}</span></label>
                <label>
                  <input type="radio" defaultChecked={this.props.data=="0"} name={name} onChange={(e)=>this.onChange(e)} value="0" />
                  <span>{def.parameters.options[1]}</span>
                </label>
                {!this.state.selected&&
                  <input type="hidden" name={name} value="-1" />
                }
              </div>
              {AfterElement}
          </div>
      )
    }

    render(){
      if(this.props.mode=='view'){
          return this.view();
      }else{
          return this.edit();
      }
    }
}
