import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, useLocation } from "react-router-dom";
import Slidemenu from './Slidemenu'
import Config from '../dm.json'
import Registry from '../ui/Registry'
import { RouteProps, withRouter } from 'react-router';
import {ContentContext} from '../Context';
import { Permission } from './Permission';
import { useState } from 'react';
import {FetchWithAuth, SetAccessToken} from '../utils/util';
import ReactTooltip from "react-tooltip";

//Whole left menu consising of slidemenu and menulist,
export default class Leftmenu extends React.Component<{}, { current: any, showSidemenu: boolean, view: any}> {

    constructor(props: any) {
        super(props);
        this.state = { current: '', showSidemenu: false, view: '' };
    }

    showSide(e:any) {
        e.preventDefault();
        this.setState({ showSidemenu: true });
    }


    componentDidMount(){
      this.fetchCurrent();
    }

    fetchCurrent() {
      FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/user/current/admin') //todo: make site name configable
        .then(res => {
          if (res.ok) {
            res.json().then((content) => {
              this.setState({current: content});
            });
          }
          else {
            this.setState({ current: false });
          }
        }).catch(() => {
          this.setState({ current: false });
        });
    }

    render() {
        if( this.state.current === '' ){
          return <div className="loading"></div>
        }else if( this.state.current === false ){
          // window.location.href= process.env.PUBLIC_URL+'/login';
          return '';
        }
        return (
              <div className="left">
                  <Slidemenu show={this.state.showSidemenu} changed={(show)=>{this.setState( { showSidemenu: show } ); this.context.update( null ); } } />
                  <div className="logomenu">
                      <a className="logo" href="#" onClick={(e) => { this.showSide(e); }}>
                          <img src={process.env.PUBLIC_URL+"/images/logo.png"} width="28px" />
                      </a>
                      <Link to="/1" className="profile"> <i className="fas fa-user"></i>&nbsp;{this.state.current.name}</Link>
                  </div>
                  <div>
                      <MenuList content={this.context.data} />
                  </div>
              </div>
        );
    }
};

Leftmenu.contextType = ContentContext;

//A menu container which list all the menus from top to down.
const MenuList = (props) => {

    let location = useLocation();
    let path = location.pathname;
    let menus: any = getCurrentMenu(path, props.content);

    return (<div>
        {menus.map((menu) => {
                        return(
                            !menu.type?
                              <Permission access={menu.path}>
                               <div className="menuitem">
                                <div className="menuitem-head">
                                 <NavLink to={menu.path} activeClassName="selected">
                                   <i className={"far "+menu.icon} /> {menu.name}
                                 </NavLink>
                                 </div>
                               </div>
                             </Permission>
                            :(()=>{
                                const Com:React.ReactType = Registry.getComponent(menu.type);
                                  return (<Com config={menu} />)
                            })()
                        )
            })}
    </div>)
}

//get leftmenu configuration based on location path
function getCurrentMenu(path: string, content:any) {
    let result:Array<any> = [];
    const leftmenuConfig = Config.leftmenu;

    for (let i = 0; i < leftmenuConfig.length; i++) {
        if (result.length > 0) {
            break;
        }
        let menus = leftmenuConfig[i].menu;
        for (let j = 0; j < menus.length; j++)
        {
              let menuitem = menus[j];
              if (menuitem.path == path)
              {
                result = menus;
                break;
              }
              else if(menuitem.root)
              {
                  if( content && content.hierarchy.split( '/' ).includes( menuitem.root.toString() ) )
                  {
                    result =menus;
                    break;
                  }
              }
        }
    }
    return result;
}
