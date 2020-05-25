import * as React from 'react';
import {Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie';

let resolves:Array<any> = [];
let LoginData:any = null;
const cookies = new Cookies();



  // let fetchLogin = async (username,password)=>{
  //   if(LoginData){
  //     return LoginData
  //   }else{
  //       fetch(process.env.REACT_APP_REMOTE_URL + '/auth/auth?username='+ username +'&password='+ password, {method: 'post'})
  //       .then((res)=>{
  //         resolves.forEach(resolve => {
  //           LoginData = res.clone().json();
  //           resolve(LoginData);
  //         });
  //       });
  //     }
  //     return new Promise((resolve, reject)=>{
  //       resolves.push(resolve);
  //     });
  //   }

    let fetchLogin = async (username,password)=>{
      return new Promise((resolve, reject) => {
        return fetch(process.env.REACT_APP_REMOTE_URL + '/auth/auth?username='+ username +'&password='+ password, {method: 'post'})
        .then(response => {
          if (response.ok) {
            LoginData = response.clone().json();
            resolve(LoginData);
            resolve(response.clone().json());
          } else {
            reject(new Error('error'))
          }
        }, error => {
          reject(new Error(error.message))
        })
      })
    }


export default class Login extends React.Component<{}, {username:string, password: string, sending:boolean, error:string, redirect:string}> {

  constructor(props: any) {
      super(props);
      this.state = { username: '', password: '', sending: false, error: '', redirect:'/eth/report' };
  }

  login(e: any) {
    e.preventDefault();
    let input = { username: this.state.username, password: this.state.password };
    this.setState({ sending: true });
    // fetch(process.env.REACT_APP_REMOTE_URL + '/user/login', { method: 'post', body: JSON.stringify(input) })
    fetchLogin(this.state.username, this.state.password)
    .then((data:any) => {
      this.setState({ sending: false });
      if (data) {
        window.location.href = process.env.PUBLIC_URL+'/';
      } else {
        data.text().then(text => {
          this.setState({ error: text });
        });
      }       
      let value = data;
      cookies.set('refreshToken',value.refresh_token)
    })
    .catch((err) => {
        this.setState({ error: err.toString() });
      });
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
