import * as React from 'react';
import { RouteProps } from 'react-router';
import Moment from 'react-moment';
// @ts-ignore
import $ from "jquery";
export default class Logout extends React.Component<{}, { error: string }> {

    constructor(props: any) {
        super(props);
        this.state = { error: '' };
    }

    //when init
    componentDidMount() {
        this.logout();
    }


    logout() {
        fetch(process.env.REACT_APP_REMOTE_URL + '/user/logout')
            .then(res => {
                if (res.ok) {
                    window.location.href = process.env.PUBLIC_URL;
                } else {
                    res.text().then(text => console.log(text));
                }
            });
    }

    render() {
        return ''
    }
}
