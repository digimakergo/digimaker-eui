import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { render } from 'react-dom';
import {FetchWithAuth} from 'digimaker-ui/util'

let requested = false;
let resolves:Array<any> = [];
let permissionData:any = null;

// Fetch permission data Asyncd and cached.
let fetchPermissionData = async ()=>{
    if(permissionData){
      return permissionData
    }else{
      if(!requested){
        requested = true;
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL +"/util/limitations/eui_all")
        .then((data)=>{
          resolves.forEach(resolve => {
            permissionData = data
            resolve(permissionData);
          });
        });
      }
      return new Promise((resolve, reject)=>{
        resolves.push(resolve);
      });
    }
}


export class Permission extends React.Component <{access:any, error?:string },{permissionData:any}>{
    constructor(props: any) {
        super(props);
        this.state = {permissionData:''}
    }

    fetchPermission()
    {
      fetchPermissionData()
            .then((data:any) => {
                let value = data[0].view;
                // Adding '/' before each array value.
                let valueAdd = value.map(el => '/' + el)
                this.setState({ permissionData: valueAdd });
            })
    }

    componentDidMount(){
        this.fetchPermission();
    }

    render()
    {
        let result:any;
        const PermissionCheck = this.state.permissionData;
        if (!PermissionCheck){
            return '';
        }
        if(PermissionCheck?PermissionCheck.includes(this.props.access):''){
            return (this.props.children);
        }
        else{
            return('');
        }


    }
}








    // fetchdata()
    // {
    //     if(permissionRequested){
    //         return;
    //     }
    //     permissionRequested = true;
    //     fetch(process.env.REACT_APP_REMOTE_URL +"/util/limitations/eui_all")
    //             .then(response=>{
    //                 return response.json()
    //             })
    //             .then(data=>{
    //                 let value = data[0].view;
    //                 let valueAdd = value.map(el => '/' + el)
    //                 callbacks.forEach((callback)=>{
    //                     callback(valueAdd);
    //                 });
    //             })
    // }
