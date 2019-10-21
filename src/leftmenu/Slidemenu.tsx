import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Config from '../Config'

export default class Slidemenu extends React.Component<{ show: boolean }, { show: boolean }> {

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
    }

    render() {
        const sidemenus = Config.leftmenu;

        return (
            <div className={"slidemenu" + (this.state.show ? '' : ' hide')}>
                <ul>
                    <li>
                        <a className="logo" onClick={() => { this.slideOut(); }}>
                            <img src="/images/logo.png" />
                        </a>
                    </li>                    
                    {sidemenus.map((menu) => {
                        return (<li><NavLink to={menu.path} onClick={()=>{this.slideOut();}} className={menu.identifier} activeClassName="selected">
                            <i className={"fas "+menu.icon}></i>
                            <div>{menu.name}</div>
                            </NavLink>
                            </li>)
                    })}
                </ul>
            </div>
        );
    }
}
