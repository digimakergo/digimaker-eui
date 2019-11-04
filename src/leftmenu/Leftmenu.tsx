import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, useLocation } from "react-router-dom";
import Slidemenu from './Slidemenu'
import Treemenu from './render/Treemenu'
import Config from '../Config'
import Registry from '../ui/Registry'
import { RouteProps, withRouter } from 'react-router';
import {ContentContext} from '../Context';

export default class Leftmenu extends React.Component<{}, { showSidemenu: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = { showSidemenu: false };
    }

    showSide() {
        this.setState({ showSidemenu: true });
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({showSidemenu:false})
    }


    render() {
        console.log( 'rendering left menu' );
        return (
              <div className="left">
                  <Slidemenu show={this.state.showSidemenu} changed={(show)=>{this.setState( { showSidemenu: show } ); this.context.update( null ); } } />
                  <div className="logomenu">
                      <a className="logo" href="#" onClick={() => { this.showSide(); }}>
                          <img src="/images/logo.png" width="28px" />
                      </a>
                      <Link to="/1" className="profile"> <i className="fas fa-user"></i>&nbsp;Chen Xiongjie</Link></div>
                  <div>
                      <MenuList content={this.context.data} />
                  </div>
              </div>
        );
    }
};

Leftmenu.contextType = ContentContext;

const MenuList = (props) => {
    let location = useLocation();
    let path = location.pathname;
    let menus: any = getCurrentMenu(path, props.content);
    return (<div>
        {menus.map((menu) => {
                        return(
                            !menu.type?<div className="menuitem"><NavLink to={menu.path} activeClassName="selected"><i className={"far "+menu.icon} /> {menu.name}</NavLink></div>
                            :(()=>{
                                const Com:React.ReactType = Registry.getComponent(menu.type);
                                return (<Com config={menu} />)
                            })()
                        )
        })}

    </div>)
}

//get menu basic on location path
function getCurrentMenu(path: string, content:any) {
    let result = [];
    const leftmenuConfig = Config.leftmenu;
    for (let i = 0; i < leftmenuConfig.length; i++) {
        if (result.length > 0) {
            break;
        }
        let menus = leftmenuConfig[i].menu;
        for (let j = 0; j < menus.length; j++) {
            let menuitem = menus[j];
            if (menuitem.path == path) {
                result = menus;
                break;
            }else if(menuitem.type=="leftmenu:treemenu"){
                if( content && menuitem.root && content.hierarchy.split( '/' ).includes( menuitem.root.toString() ) ){
                  result =menus;
                  break;
                }
            }
        }
    }
    return result;
}
