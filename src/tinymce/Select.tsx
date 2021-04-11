import * as React from 'react';
import {Redirect} from 'react-router-dom';
import List from 'digimaker-ui/List';
import DMInit from 'digimaker-ui/DMInit';
import Browse from 'digimaker-ui/Browse';
import Config from '../dm.json';
import util from 'digimaker-ui/util';
import { env } from 'process';

export default class Select extends React.Component<{contenttype:string}, {selected: any, width: string, height: string}> {

    constructor(props: any) {
        super(props);
        this.state = { selected: '', width:'', height:''};
    }

    onSelect(selected){
        // this.setState({selected: selected});   
        window.parent.postMessage(
            {
                mceAction: 'customAction',
                data: {image: selected, width: this.state.width, height: this.state.height}
            }, '*');    
    }

    confirm(){
         window.parent.postMessage(
             {
                 mceAction: 'customAction',
                 data: {image: this.state.selected, width: this.state.width, height: this.state.height}
             }, '*');
    }

    render(){
        let browseConfig = Config.browse;
        return <DMInit>
            <div>
                Width: <input size={3} onChange={(e)=>this.setState({width:e.target.value})} type="text" />
                Height: <input size={3} onChange={(e)=>this.setState({height:e.target.value})}  type="text" />                
            </div>
            <Browse contenttype={[this.props.contenttype]} trigger={true} inline={true} multi={false} config={browseConfig}  onConfirm={(selected)=>this.onSelect(selected)} />            
            </DMInit>
    }
}