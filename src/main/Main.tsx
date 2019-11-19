import * as React from 'react';
import { RouteProps } from 'react-router';
import Config from '../config.json';
import List from './List';
import MetaInfo from './MetaInfo';
import Actions from './Actions';
import Service from '../Service';
import ViewContent from './ViewContent';
import Registry from '../ui/Registry';
import {ContentContext} from '../Context';


export default class Main extends React.Component<RouteProps, { content: any, list: any }> {

    constructor(props: any) {
        super(props);
        this.state = { content: '', list: '' };
    }


    //fetch content and set to context
    fetchData(id) {
        fetch(process.env.REACT_APP_REMOTE_URL + '/content/get/' + id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ content: data });
                let context = this.context;
                context.update(data);
            })
    }

    componentDidMount() {
        this.fetchData(this.props.match.params.id);
    }

    componentDidUpdate( prevProps, prevState, snapshot ){
      //when changing page
      if( prevProps.match.params.id != this.props.match.params.id)
      {
        this.fetchData(this.props.match.params.id);
      }
    }

    render() {
        if( !this.state.content ){
          return '';
        }
        let contenttype = this.state.content.content_type;
        let mainConfig = Config.main[contenttype];
        let listContenttypes: Array<string> = [];

        let configList = mainConfig?mainConfig['list']:false;
        if( configList ){
          configList.map((value:string)=>{
              let arr = value.split( ':' );
              let type: string = arr[0];
              if( arr.length == 1 ){
                listContenttypes.push( type );
              }else if( arr.length>1 ){
                  let conditions = arr[1];
                  if (this.state.content.hierarchy.split('/').includes( conditions )){
                    listContenttypes.push( type );
                  }
              }
          });
        }

        return (
            <div className={this.state.content.content_type}>
                <div className="path">{this.state.content.name}</div>
                {/* side info like meta, tools */}
                <div className="side">
                    <MetaInfo content={this.state.content} />
                    <Actions content={this.state.content} />
                    {mainConfig&&mainConfig['tools']&&mainConfig['tools'].map((tool)=>{
                        let Com:React.ReactType = Registry.getComponent( tool );
                        return <Com content={this.state.content}/>
                    })}
                </div>

                {/* view content */}
                {mainConfig&&mainConfig['view']&&<div className="view-content">
                    <ViewContent content={this.state.content} />
                </div>
                }

                {/* children list */}
                {listContenttypes.length>0&&
                <div className="list">
                {
                    listContenttypes.map((value)=>{
                        return(<List id={this.props.match.params.id} contenttype={value} />)
                    })
                }
                </div>
                }
            </div>

        );
    }
}


Main.contextType = ContentContext;
