let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTAwODc4NjMsImd1aWQiOiI1MDExOTI4Ni1kMjkzLTQyOWMtODgxYi1hMTcxZGFiYzliNjMiLCJ1c2VyX2lkIjoxfQ.gWt78lq9CFW7s1l7B8_-eroKJ4kLm4W_shMAVIZ4RA8';

let accessToken: any = null; //access token, which is a promise<string>

export function FetchWithAuth(url: string, reqObj?: any) {
  return GetAccessToken().
    catch(err => {
      console.error(err) // todo: rediction or prompt message here or outside? returning a renderable error component might be good?
    }).then(token => {
      // add Authorization into header
      let authValue = 'Bearer ' + token;
      if (reqObj) {
        if (reqObj.headers) {
          reqObj.headers.delete('Authorization'); //If there is Authorization already, replace with this token
          reqObj.headers.append('Authorization', authValue);
        } else {
          reqObj.headers = new Headers({ 'Authorization': authValue });
        }
      } else {
        reqObj = { headers: new Headers({ 'Authorization': authValue }) };
      }

      //fetch
      return fetch(url, reqObj).then(res => {
        if (res.status == 440) { //if it expired, renew token and refetch with new token
          accessToken = null;
          return FetchWithAuth(url, reqObj);
        }
        return res;
      })
    });
}

//get new/renewed/cached access token, return promise<token>
//todo: use sigleton way to make sure it will only request once when accessToken is empty.
export function GetAccessToken() {
  if (!accessToken) {
    accessToken = fetch(process.env.REACT_APP_REMOTE_URL + '/auth/token/access/renew?token=' + refreshToken)
      .then(res => {
        if (!res.ok) {
          throw new Error("Can not get token. Need to relogin?");
        }
        accessToken = res.text();
        return accessToken
      });
  }
  return accessToken
}

//Set access token. Useful when eg login.
export function SetAccessToken(token: string) {
  accessToken = new Promise(func => func(token))
}
