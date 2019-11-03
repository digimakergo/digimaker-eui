import * as React from 'react';
import { RouteProps } from 'react-router';
import Config from '../config.json';
import List from './List';
import MetaInfo from './MetaInfo';
import Actions from './Actions';
import Service from '../Service';
import {ContentContext} from '../Context';


export default class Main extends React.Component<RouteProps, { content: any, list: any }> {

    constructor(props: any) {
        super(props);
        this.state = { content: '', list: '' };
    }


    fetchData(id) {
        fetch(process.env.REACT_APP_REMOTE_URL + '/content/get/' + id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ content: data });
                let context = this.context;
                context.update(data);

            })
    }

    componentDidMount() {
        this.fetchData(this.props.match.params.id);
    }

    componentDidUpdate( prevProps, prevState, snapshot ){
      //when changing page
      if( prevProps.match.params.id != this.props.match.params.id)
      {
        this.fetchData(this.props.match.params.id);
      }
    }

    render() {
        const listContenttypes = Config.main["folder"].list;

        return (
            <div>
                <div className="path">{this.state.content.name}</div>
                <div className="side">
                    <MetaInfo content={this.state.content} />
                    <Actions content={this.state.content} />
                </div>
                <div className="list">
                {
                    listContenttypes.map((value)=>{
                        return(
                        <List id={this.props.match.params.id} contenttype={value} />
                        )
                    })
                }
                </div>
            </div>

        );
    }
}


Main.contextType = ContentContext;
