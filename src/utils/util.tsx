import Cookies from 'universal-cookie';

const cookies = new Cookies();

const refreshToken = cookies.get('refreshToken')

let accessToken: any; //access token, which is a promise<string>
export function FetchWithAuth(url:string, initObj?:any){
  return GetAccessToken().then( token=>{
    //create add Authorization into header
    let authValue = 'Bearer '+token;
    if( initObj ){
      if(initObj.headers){
          initObj.headers.append( 'Authorization', authValue );
      }else{
        initObj.headers = new Headers({'Authorization': authValue});
      }
    }else{
      initObj = {headers:new Headers({'Authorization': authValue}) };
    }
    //fetch
    return fetch(url, initObj)
  })
}

//get new/renewed/cached access token, return promise(token)
export function GetAccessToken() {
  if (accessToken) {
    return accessToken;
  }
  let fetchPro = fetch(process.env.REACT_APP_REMOTE_URL + '/auth/token/access/renew?token=' + refreshToken)
    .then(res => {
      accessToken = res.text();
      return accessToken
    });
    //todo: add handling when fail because of invalid/network issue/other or expired
  return fetchPro
}

//Set access token. Useful when eg login.
export function SetAccessToken(token: string){
  accessToken = token
}
