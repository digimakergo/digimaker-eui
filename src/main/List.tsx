import * as React from 'react';
import Moment from 'react-moment';
import Config from '../config.json';
import Create from '../actions/Create';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class List extends React.Component<{ id: number, contenttype: string }, { content: any, list: any, actionNew: boolean }> {

   private config: any

    constructor(props: any) {
        super(props);
        this.state = { content: '', list: '', actionNew: false };
        this.config = Config.list[this.props.contenttype]
    }


    fetchData(id) {
        let sortby = "sortby="+this.config['sort_default'].join('%3B');
        fetch(process.env.REACT_APP_REMOTE_URL + '/content/list/' + id+'/'+this.props.contenttype+'?'+sortby)
            .then(res => res.json())
            .then((data) => {
                this.setState({ list: data });
            })
    }
    componentWillMount() {
        this.fetchData(this.props.id);
    }


    componentWillReceiveProps(nextProps) {
        this.fetchData(nextProps.id);
    }

    renderList(list) {
        let rows: Array<any> = [];
        for (let i = 0; i < list.length; i++) {
            var item = list[i]
            rows.push(<tr>
              <td><input type="checkbox" /></td>
              <td>{item.id}</td>
              {this.config.columns.map((column)=>{
                  switch(column){
                    case 'name':
                      return (<td className="content-name"><span><a href="#">{item.name}</a></span></td>);
                    case 'author':
                      return (<td>Chen</td>)
                    case 'published':
                      return (<td><Moment unix format="DD.MM.YYYY HH:mm">{item.published}</Moment></td>)
                    case 'modified':
                      return <td><Moment unix format="DD.MM.YYYY HH:mm">{item.modified}</Moment></td>
                    default:
                      return <td className={"column-"+column}>{item[column].Raw}</td>
                    break;
                  }
              })}

            <td className="list-row-tool">
            {this.config.row_actions.map( (action) =>{
                return (<a href="/content/delete/76" className="action" title={action}><i className={"far icon-"+action}></i></a>)
            } )}
            {this.config.row_more.length>0&&
             <a href="#" className="action" title="More"><i className="fas fa-ellipsis-h"></i></a>
             }
            </td></tr>)
        }
        return rows;
    }

    renderAList(data) {
        return (<div>
            {this.config.show_header&&<h3>{this.props.contenttype}({data.length})</h3>}
            <table className="table">
              {this.config['show_table_header']&&<tr>
                <td><input type="checkbox" title="Select all"/></td>
                <td>ID</td>
                {this.config.columns.map( (column)=>{
                  if( column == 'published' ){
                    column = 'Sent';
                  }
                  let sortable = this.config.sort.indexOf( column )!=-1;
                  return (<td>{sortable?<a href="#" className="column-sortable">{column}</a>:column}</td>) //todo: use name from definition.
                } )}
                <td>Actions</td>
                </tr>}
              {this.renderList(data)}
            </table>
            <div className="text-right">
            <span>Total: {this.state.list.count}</span>
            <span>
              <a href="#">&lt;</a>&nbsp;&nbsp;
              <a href="#">&gt;</a>&nbsp;&nbsp;
              <a href="#">|&lt;</a>&nbsp;&nbsp;
              <a href="#">&gt;|</a>
              </span>
            </div>
        </div>
        )
    }

    newContent = () => {
        this.setState({ actionNew: true });
    }



    render() {
        if( !this.state.list ){
            return '';
        }
        return (
            <div>
                <div className="content-list-tools">
                  {/*
                     <Link to={`/create/${this.props.id}/article`} className="btn btn-link btn-sm">
                        <i className="fas fa-plus-square"></i> New
                     </Link> */}

                     {!this.config.show_table_header&&
                       <a href="/content/new/frontpage/1" className="btn btn-link btn-sm">
                          <input type="checkbox" value="" />
                          &nbsp;All
                       </a>
                     }
                    {this.config.actions.map((action)=>{
                        return (<a href="#" className="btn btn-link btn-sm" title={action}>
                          <i className={"icon icon-"+action}></i>
                          {action}</a>)
                    })}
                    {!this.config.show_table_header&&
                    <span>
                        <i className="fas fa-sort-alpha-up"></i> &nbsp;
<select className="form-control">
                            <option>Published</option>
                            <option>Modified</option>
                        </select>
                    </span>
                  }
                </div>
                {this.renderAList(this.state.list.list)}
            </div>
        );
    }
}
