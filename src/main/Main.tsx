import * as React from 'react';
import { RouteProps } from 'react-router';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Config from '../dm.json';
import Moment from 'react-moment';
import List from './List';
import MetaInfo from './MetaInfo';
import Actions from './Actions';
import Search from './Search';
import Service from '../Service';
import ViewContent from './ViewContent';
import Registry from '../ui/Registry';
import {ContentContext} from '../Context';
import {FetchWithAuth} from '../utils/util';
import ReactTooltip from "react-tooltip";

export default class Main extends React.Component<RouteProps, { content: any, list: any, sideOpen:any }> {

    constructor(props: any) {
        super(props);
        this.state = { content: '', list: '', sideOpen: 1 };
    }


    //fetch content and set to context
    fetchData(id) {
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/get/' + id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ content: data });
                let context = this.context;
                context.update(data);
            }).catch(err=>{
              this.setState(()=>{throw err});
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
        if( !this.state.content )
        {
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
            <div className={"contenttype-"+this.state.content.content_type}>
            <div className="main-top">
                <Search />
                <h2>
                  {this.state.content.name}&nbsp;&nbsp;
                  {(!(contenttype=='folder'&&this.state.content.folder_type=='site'))&&<Link className="go-uppper" title="Go upper" to={'/main/'+this.state.content.parent_id}>
                  <i className="fas fa-chevron-circle-up"></i>
                  </Link>}
                </h2>
                <div>
                <i style={{fontSize:'0.85rem'}}>modified by <Link to={"/main/"+this.state.content.author}>{this.state.content.author_name}</Link> <Moment unix format="DD.MM.YYYY HH:mm">{this.state.content.modified}</Moment></i>
                &nbsp;&nbsp;<a href="#"><i data-tip data-for="metainfo"  className="fas fa-info-circle"></i></a>
                <ReactTooltip id='metainfo' clickable={true} delayHide={500} place="bottom" effect='solid'>
                  <MetaInfo content={this.state.content} />
                </ReactTooltip>&nbsp;&nbsp;
                </div>
              </div>
              <div className="main-main">
                <div className="main-content">
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

                {/* side area for actions */}
                {mainConfig&&mainConfig['actions']&&<div className={"side"+(this.state.sideOpen===true?' open':'')+(this.state.sideOpen===false?' closed':'')}>
                    <div className="hider"><a href="#" onClick={(e)=>{e.preventDefault();this.setState({sideOpen:!this.state.sideOpen})}}>
                       <i className="fas fa-caret-down"></i>
                    </a></div>
                    <div className="side-body">
                      <Actions content={this.state.content} />
                    {mainConfig&&mainConfig['tools']&&mainConfig['tools'].map((tool)=>{
                        let Com:React.ReactType = Registry.getComponent( tool );
                        return <Com content={this.state.content}/>
                    })}
                    </div>
                </div>
                }
                </div>

            </div>

        );
    }
}


Main.contextType = ContentContext;
