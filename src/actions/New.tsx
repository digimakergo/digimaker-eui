import * as React from 'react';
import Moment from 'react-moment';
import Config from '../config.json';

export default class New extends React.Component<{show:string, contenttype:string, parent: number},{definition:any, components:{}}> {

constructor(props:any) {
      super(props);
      this.state = {definition:'', components:{}};
    }


    loadFieldtype(type){
        var com: any;
        import(`../fieldtype/${type}`)
         .then(component =>{
                console.log( `${type} is loaded` );
                if( !this.state.components[type] )
                {
                    var coms = this.state.components;
                    coms[type] = component.default;
                    this.setState({components: coms});
                }
             }
         )
         .catch(error => {
           console.error(`"${type}" not yet supported`);
         });
    }


    fetchData(){
     fetch(Config.remote_server+'/contenttype/get/article' )
           .then(res=>res.json())
           .then( (data) => {
             this.setState({definition : data});
             for( let identifier in this.state.definition.fields ){
                var fieldtype = this.state.definition.fields[identifier].type;
                const type = Config.fieldtypes[fieldtype];
                if(type)
                {
                    this.loadFieldtype(type);
                }
                else
                {
                    console.warn( "field type" + fieldtype + " is not defined. Please define it in config.json" );
                }
             }
           } )
    }

    componentWillReceiveProps(){
     this.fetchData();
    }

    keyUpHandler(event) {
            if(event.keyCode == 27){
                //this.props.show = 'false';
            }
        }

    handleSubmit(event){
        event.preventDefault();
        const form = new FormData(event.target);
        const dataObject = {};
        for( let key of Array.from( form.keys() ) ){
            dataObject[key] = form.get( key );
        };
        fetch(Config.remote_server+'/content/new/'+this.props.parent+'/'+this.props.contenttype, {
             method: 'POST',
             body: JSON.stringify(dataObject),
         }).then((res)=>{
             if( res.ok )
             {

             }else{
                console.log( res )
             }
         });
    }

render(){
    if( !this.state.definition ) return <div>loading</div>;


    return (<div onKeyUp={this.keyUpHandler} className={this.props.show=='true'?'container-new':'hidden'}>
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-tool">
                    <div>
                        <label>Resources</label>
                        <div>
                            <ul className="nav nav-tabs">
                                <li className="active"><a data-toggle="images" href="#images">Images</a></li>
                                <li><a data-toggle="contents" href="#images">Contents</a></li>
                                <li><a data-toggle="videos" href="#images">Videos</a></li>
                            </ul>
                       </div>

                    </div>

                    <div className="form-actions">
                        <label>Actions</label>
                        <div>
                            <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-sm">Save draft</button>
                        </div>
                        <div>
                            <button type="button" className="btn btn-sm">Cancel</button>
                        </div>
                    </div>
                </div>

                <div className="form-main">
                    <h2>New content</h2>
                    <div>
                        {this.state.definition?this.state.definition.fields_display.map((key)=>{
                                const typeStr = this.state.definition.fields[key].type;
                                const Fieldtype: React.ReactType = this.state.components[Config.fieldtypes[typeStr]];
                                return (<div>
                                            {Fieldtype?<Fieldtype identifier={key} definition={this.state.definition.fields[key]} />:''}
                                        </div>)}):''}
                    </div>
                </div>
                </form>
            </div>
           </div>)
}
}
