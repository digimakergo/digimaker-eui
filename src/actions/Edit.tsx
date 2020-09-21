import * as React from 'react';
import Moment from 'react-moment';
import { RouteProps } from 'react-router';
import { Link, Redirect } from "react-router-dom";
import Config from '../dm.json';
import LoadFields from 'digimaker-ui/LoadFields';
import Registry from 'digimaker-ui/Registry';
import {FetchWithAuth} from 'digimaker-ui/util';

export default class Edit extends React.Component<{id:number, contenttype?:string, afterAction:any}, {content:any,validation:{}}> {

    private params:string = '';

    constructor(props: any) {
        super(props);
        this.state = {content:'',validation:''};
    }

    fetchData() {
        let url = '/content/get/'+this.params
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + url)
            .then(res => res.json())
            .then((data) => {
                this.setState({ content: data});
            })
    }

    componentDidMount(){
      this.params = this.props.contenttype?(this.props.contenttype+'/'+this.props.id):this.props.id+'';
      this.fetchData();
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const dataObject = {};
        for (let key of Array.from(form.keys())) {
            dataObject[key] = form.get(key);
        };

        let url = '/content/update/'+this.params;
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + url, {
            method: 'POST',
            body: JSON.stringify(dataObject),
        }).then((res) => {
            if (res.ok) {
              this.props.afterAction(1);
            }else {
                console.log(res)
                return res.json();
            }
        }).then((data)=>{
            this.setState( {validation: data} )
        });
    }

    cancel(){
      this.props.afterAction(2);
    }

    render() {
        if( !this.state.content ){
          return (<div className="loading" />)
        }

        let data:any = {};
        let content = this.state.content;


        const Com:React.ReactType = Registry.getComponent("edit:before");
        return (<div className="container-new">
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-tool">
                        <div className="form-actions">
                            <div className="action-title">Actions</div>
                            <div className="action-body">
                                <div>
                                    <button type="submit" className="btn btn-primary btn-sm"><i className="fas fa-paper-plane"></i> Submit</button>
                                </div>
                                <div>
                                    <button type="button" onClick={()=>this.cancel()} className="btn btn-sm btn-secondary">
                                            <i className="fas fa-window-close"></i> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="form-main">
                        <h2>Edit {content.name}</h2>
                        {Com!=null?<Com />:''}

                        <LoadFields mode='edit' type={content.content_type} data={content} validation={this.state.validation}  />
                    </div>
                </form>
            </div>
        </div>)
    }
}
