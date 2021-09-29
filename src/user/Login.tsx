import * as React from 'react';
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';
import util from 'digimaker-ui/util';

const cookies = new Cookies();


export default class Login extends React.Component<{}, {username:string, password: string, sending:boolean, error:string}> {

  constructor(props: any) {
      super(props);
      this.state = { username: '', password: '', sending: false, error: '' };
  }

  login(e: any) {
    e.preventDefault();
    let input = { username: this.state.username, password: this.state.password };
    this.setState({ sending: true });
    fetch(process.env.REACT_APP_REMOTE_URL + '/auth/auth', { method: 'post', body: JSON.stringify(input) })
    .then((response) => response.json())
    .then((res) => {
      cookies.set( util.getCookieKey(),res.data.refresh_token);
      window.location.href = process.env.PUBLIC_URL+'/';
    })
    .catch((err) => {
        this.setState({ error: err.toString() });
      });
  }

  handleErrors(response) {
    if (!response.ok) throw new Error(response.status);
    return response;
}

  updateUsername(e: any) {
    this.setState({ username: e.target.value });
  }

  updatePassword(e: any) {
    this.setState({ password: e.target.value });
  }

    render() {
        return (
            <div className="login">
                <form>
                <h2>Login</h2>
                <div>
                    <label>Username:</label> <input value={this.state.username} onChange={(e)=>this.updateUsername(e)} type="text" className="form-control" />
                </div>
                <div>
                    <label>Password:</label> <input value={this.state.password} onChange={(e)=>this.updatePassword(e)} type="password" className="form-control" />
                </div>
                <div className="block">
                    <input type="submit" className="btn btn-primary btn-sm" onClick={(e)=>this.login(e)} value="Login" /> &nbsp;
                    <input type="reset" className="btn btn-secondary btn-sm" value="Reset" />
                </div>

                {this.state.sending&&<span className="loading"></span>}
                {this.state.error&&<div className="block alert alert-warning">{this.state.error}</div>}
                </form>
            </div>
        );
    }
};
