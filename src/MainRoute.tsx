import React from 'react';
import { Switch, BrowserRouter as Router, Route, Link, useLocation, Redirect } from "react-router-dom";
import queryString from 'query-string';
import Main from './main/Main';
import Create from './actions/Create';
import Edit from './actions/Edit';
import ViewVersion from './main/ViewVersion';

//with priorized urls, it does redirection. first url which is not empty will be redirected.
const commonAfterAction = (history:any, status:number, urls:Array<any>)=>{
    for( let url of urls ){
       if( url ){
         history.push( url );
         break;
       }
    }
};

const getFromParam = (location:string)=>{
    let params = queryString.parse(location);
    return params['from'];
  };

const MainRoute = (props: {config: any })=>{
    return (
        <div>
            <Route path="/main/:id" exact render={route=><Main id={route.match.params.id} mainConfig={props.config.main} listConfig={props.config.list} />} />
            <Route path="/main/:contenttype/:id" exact render={route=><Main id={route.match.params.id} contenttype={route.match.params.contenttype} mainConfig={props.config.main} listConfig={props.config.list}  />} />
            <Route path="/create/:parent/:contenttype" render={route=><Create key={Date.now()} parent={route.match.params.parent} contenttype={route.match.params.contenttype} afterAction={(status)=>commonAfterAction( route.history, status, ['/main/' + route.match.params.parent] )} />} />
            <Route path="/edit/:contenttype/:id" exact render={route=><Edit id={route.match.params.id} contenttype={route.match.params.contenttype} afterAction={(status, params)=>commonAfterAction(route.history,status, [getFromParam(route.location.search), '/main/'+route.match.params.contenttype+'/'+route.match.params.id])} />} />
            <Route path="/edit/:id" exact render={route=><Edit id={route.match.params.id} afterAction={(status, params)=>commonAfterAction(route.history,status, [getFromParam(route.location.search), '/main/'+route.match.params.id])} />} />
            <Route path="/version/:id/:version" component={ViewVersion} />
        </div>
    );
}

export default MainRoute;