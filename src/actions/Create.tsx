import * as React from 'react';
import Moment from 'react-moment';
import { RouteProps } from 'react-router';
import { Link, Redirect } from "react-router-dom";
import LoadFields from 'digimaker-ui/LoadFields';
import {FetchWithAuth} from 'digimaker-ui/util';

export default class Create extends React.Component<{parent:number, contenttype:string, afterAction:any}, {validation:{}}> {

    constructor(props: any) {
        super(props);
        this.state = {validation:''};
    }

    keyUpHandler(event) {
        if (event.keyCode == 27) {
            //this.props.show = 'false';
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const dataObject = {};
        for (let key of Array.from(form.keys())) {
            dataObject[key] = form.get(key);
        };
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/create/' + this.props.contenttype + '/' + this.props.parent, {
            method: 'POST',
            body: JSON.stringify(dataObject),
        }).then((data) => {
            if( data.error === false ){
                this.props.afterAction(1, data);           
            }else{
                //todo: check error code to distigush network error vs normal error
                window.alert(data.data.message);
                this.setState( {validation: data.data.detail} )
            }
        });
    }

    render() {
        return (<div onKeyUp={this.keyUpHandler} className="container-new">
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
                                    <Link to={`/main/${this.props.parent}`}>
                                        <button type="button" className="btn btn-sm btn-secondary">
                                            <i className="fas fa-window-close"></i> Cancel
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>                    


                    </div>

                    <div className="form-main">
                        <h2>Create {this.props.contenttype}</h2>
                        <LoadFields type={this.props.contenttype} validation={this.state.validation} data='' mode='edit'/>
                    </div>
                </form>
            </div>
        </div>)
    }
}
