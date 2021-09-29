import * as React from 'react';
import { useState, useEffect } from "react";
import {FetchWithAuth} from 'digimaker-ui/util';

//A menu container which list all the menus from top to down.

const CurrrentUser = (props) => {
    const [current, setCurrent] = useState('');

    useEffect(() => {
        if( !current ){
          FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/user/current/admin') //todo: make site name configable
          .then(data => {
                if( data.error === false ){
                  setCurrent(data.data);
                }
          });        
        }
      });    


    return (<>{props.as(current)}</>);
}

export default CurrrentUser;