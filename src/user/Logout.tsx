import * as React from 'react';
import { RouteProps } from 'react-router';
import Moment from 'react-moment';
import util from 'digimaker-ui/util';
import Cookies from 'universal-cookie';
// @ts-ignore
import $ from "jquery";

let cookies = new Cookies();
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
           let refreshToken = cookies.get(util.getCookieKey())
           fetch(process.env.REACT_APP_REMOTE_URL +'/auth/token/revoke?token='+ refreshToken)
          .then(res => {
              if(res.ok){
                  cookies.remove(util.getCookieKey());
                  window.location.href = process.env.PUBLIC_URL+'/';
              }else{
                  res.text().then(text => console.log(text));
              }
          });
    }

    render() {
        return ''
    }
}
