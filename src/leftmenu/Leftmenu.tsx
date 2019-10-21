import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, useLocation } from "react-router-dom";
import Slidemenu from './Slidemenu'
import Treemenu from './render/Treemenu'
import Config from '../Config'
import Registry from '../ui/Registry'
import { RouteProps, withRouter } from 'react-router';

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

        return (
            <div className="left">
                <Slidemenu show={this.state.showSidemenu} />
                <div className="logomenu">
                    <a className="logo" href="#" onClick={() => { this.showSide(); }}>
                        <img src="/images/logo.png" width="28px" />
                    </a>
                    <Link to="/1" className="profile"> <i className="fas fa-user"></i>&nbsp;Chen Xiongjie</Link></div>
                <div>
                    <MenuList />
                </div>
            </div>
        );
    }
};

function MenuList() {
    let location = useLocation();
    let path = location.pathname;
    let menus: any = getCurrentMenu(path);
    return (<div>
        {menus.map((menu) => {
            return (<div className="menuitem">
                        {
                            !menu.type?<NavLink to={menu.path} activeClassName="selected"><i className={"far "+menu.icon} /> {menu.name}</NavLink>
                            :(()=>{
                                const Com:React.ReactType = Registry.getComponent(menu.type);
                                return (<Com />)
                            })()
                        }
                    </div>)
        })}
        {menus.length == 0 && <div><div className="menuitem">
            <NavLink to="/1" activeClassName="selected"><i className="far fa-folder" /> Dashboard</NavLink></div>
            <div className="menuitem"><a href="#" className="settings"> <i className="fas fa-wrench"></i> </a>
                <Treemenu />
            </div></div>
        }
    </div>)
}

//get menu basic on location path
function getCurrentMenu(path: string) {
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
            }
        }
    }
    return result;
}
