import * as React from 'react';
import Moment from 'react-moment';
import { RouteProps } from 'react-router';
import { Link, Redirect } from "react-router-dom";
import Config from '../config.json';

export default class Create extends React.Component<RouteProps, { definition: any, components: {} }> {

    constructor(props: any) {
        super(props);
        this.state = { definition: '', components: {} };
    }


    loadFieldtype(type) {
        var com: any;
        import(`../fieldtype/${type}`)
            .then(component => {
                console.log(`${type} is loaded`);
                if (!this.state.components[type]) {
                    var coms = this.state.components;
                    coms[type] = component.default;
                    this.setState({ components: coms });
                }
            }
            )
            .catch(error => {
                console.error(`"${type}" not yet supported`);
            });
    }


    fetchData() {
        fetch(Config.remote_server + '/contenttype/get/'+this.props.match.params.contenttype)
            .then(res => res.json())
            .then((data) => {
                this.setState({ definition: data });
                for (let identifier in this.state.definition.fields) {
                    var fieldtype = this.state.definition.fields[identifier].type;
                    const type = Config.fieldtypes[fieldtype];
                    if (type) {
                        this.loadFieldtype(type);
                    }
                    else {
                        console.warn("field type" + fieldtype + " is not defined. Please define it in config.json");
                    }
                }
            })
    }

    componentWillMount() {
        this.fetchData();
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
        fetch(Config.remote_server + '/content/new/' + this.props.match.params.parent + '/' + this.props.match.params.contenttype, {
            method: 'POST',
            body: JSON.stringify(dataObject),
        }).then((res) => {
            if (res.ok) {
                this.props.history.push('/main/' + this.props.match.params.parent);
                //todo: use redirect parameters
            } else {
                console.log(res)
            }
        });
    }

    render() {
        if (!this.state.definition) return <div className="loading"></div>;
        return (<div onKeyUp={this.keyUpHandler} className="container-new">
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-tool">
                        <div className="form-actions">
                            <div className="block-title">Actions</div>
                            <div className="block-body">
                                <div>
                                    <button type="submit" className="btn btn-primary btn-sm"><i className="fas fa-paper-plane"></i> Submit</button>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-sm btn-secondary"><i className="fas fa-save"></i> Save draft</button>
                                </div>
                                <div>
                                    <Link to={`/main/${this.props.match.params.parent}`}>
                                        <button type="button" className="btn btn-sm btn-secondary">
                                            <i className="fas fa-window-close"></i> Cancel
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <div className="block-title">Resources</div>
                            <div className="block-body">
                                <ul className="nav nav-tabs">
                                    <li className="active"><a data-toggle="images" href="#images">Images</a></li>
                                    <li><a data-toggle="contents" href="#images">Contents</a></li>
                                    <li><a data-toggle="videos" href="#images">Videos</a></li>
                                </ul>
                            </div>

                        </div>


                    </div>

                    <div className="form-main">
                        <h2>Create {this.state.definition.name}</h2>
                        <div>
                            {this.state.definition ? this.state.definition.fields_display.map((key) => {
                                const typeStr = this.state.definition.fields[key].type;
                                const Fieldtype: React.ReactType = this.state.components[Config.fieldtypes[typeStr]];
                                return (<div>
                                    {Fieldtype ? <Fieldtype identifier={key} definition={this.state.definition.fields[key]} /> : ''}
                                </div>)
                            }) : ''}
                        </div>
                    </div>
                </form>
            </div>
        </div>)
    }
}
