import * as React from 'react';
import { useState, useEffect } from "react";
import {FetchWithAuth} from 'digimaker-ui/util';

//A menu container which list all the menus from top to down.

const CurrrentUser = (props) => {
    const [current, setCurrent] = useState('');

    useEffect(() => {
        if( !current ){
          FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/user/current/admin') //todo: make site name configable
          .then(res => {
            if (res.ok) {
              res.json().then((content) => {
                setCurrent(content);
              });
            }
            else {
              //todo: throw error
            }
          }).catch(() => {
            //todo: throw error
          });
        }        
      });    


    return (<>{props.as(current)}</>);
}

export default CurrrentUser;