import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Config from '../dm.json'

export default class Slidemenu extends React.Component<{ show: boolean, changed: any }, { show: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = { show: props.show };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.show && !prevState.show && this.props.show) {
            this.setState({ show: true });
        }
    }

    slideOut() {
        this.setState({ show: false });
        this.props.changed( false );
    }

    render() {
        const sidemenus = Config.leftmenu;

        return (
            <div className={"slidemenu" + (this.state.show ? '' : ' hide')}>
                <ul>
                    <li>
                        <a className="logo" href="#" onClick={(e) => { e.preventDefault(); this.slideOut(); }}>
                            <img src={process.env.PUBLIC_URL+"/images/logo.png"} />
                        </a>
                    </li>
                    {sidemenus.map((menu:any, i:number) => {
                        return (<li key={menu.path}>
                              <NavLink to={menu.path} onClick={()=>{this.slideOut();}} className={menu.identifier} activeClassName="selected">
                                <i className={"fas "+menu.icon}></i>
                              <div>{menu.name}</div>
                              </NavLink>
                            </li>)
                    })}
                </ul>
                <div className="logout">
                  <Link title="Logout" to="/logout"><i className="fas fa-sign-out-alt"></i></Link>
                </div>
            </div>
        );
    }
}
