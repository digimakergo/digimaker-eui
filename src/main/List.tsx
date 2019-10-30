import * as React from 'react';
import Moment from 'react-moment';
import Config from '../config.json';
import Create from '../actions/Create';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class List extends React.Component<{ id: number, contenttype: string }, { content: any, list: any, actionNew: boolean, currentPage:number, sortby: Array<Array<string>> }> {

   private config: any

    constructor(props: any) {
        super(props);
        this.config = Config.list[this.props.contenttype]
        this.state = { content: '', list: '', actionNew: false, currentPage: 0, sortby:this.config['sort_default']};

    }


    getSortbyStr(sortby:Array<Array<string>>){
      let arr:Array<string> =[];
      sortby.map((item)=>{
        arr.push( item.join(',') );
       });
       return arr.join('%3B');
    }


    fetchData() {
        let id = this.props.id;
        console.log( this.state.sortby );
        let sortby = "sortby="+this.getSortbyStr( this.state.sortby );
        let limit = "";
        let pagination = this.config.pagination;
        if(  pagination!= -1 ){
            limit = "&limit="+pagination+"&offset="+pagination*this.state.currentPage
        }
        fetch(process.env.REACT_APP_REMOTE_URL + '/content/list/' + id+'/'+this.props.contenttype+'?'+sortby+limit)
            .then(res => res.json())
            .then((data) => {
                this.setState({ list: data });
            })
    }

    //sort by column
    sort(e, column){
      e.preventDefault();
      let sortby1 = this.state.sortby;
      let order = 'asc';
      if( sortby1[0][0] == column ){
          order = sortby1[0][1]=='desc'?'asc':'desc';
      }
      this.setState({sortby:[[column, order]]});
    }

    //when init
    componentDidMount() {
        this.fetchData();
    }

    //when state changed
    componentDidUpdate( prevProps, prevState, snapshot ){
      //when changing page
      if( prevState.currentPage != this.state.currentPage
        || this.getSortbyStr( prevState.sortby ) != this.getSortbyStr( this.state.sortby )
        || prevProps.id != this.props.id)
      {
        this.fetchData();
      }
    }

    renderRows(list) {
        let rows: Array<any> = [];
        for (let i = 0; i < list.length; i++) {
            var content = list[i]
            rows.push(<tr>
              <td><input type="checkbox" /></td>
              <td>{content.id}</td>
              {this.config.columns.map((column)=>{
                  switch(column){
                    case 'name':
                      return (<td className="content-name"><span><Link to={"/main/"+content.id}>{content.name}</Link></span></td>);
                    case 'author':
                      return (<td>Chen</td>)
                    case 'published':
                      return (<td><Moment unix format="DD.MM.YYYY HH:mm">{content.published}</Moment></td>)
                    case 'modified':
                      return <td><Moment unix format="DD.MM.YYYY HH:mm">{content.modified}</Moment></td>
                    case 'priority':
                      return (<td>{content[column]}</td>)
                    default:
                      return <td className={"column-"+column}>{content[column].Raw}</td>
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

    renderList(data) {

        let totalPage = Math.ceil( this.state.list.count/this.config.pagination);
        return (<div>
            {this.config.show_header&&<h3>{this.props.contenttype}({this.state.list.count})</h3>}
            <table className="table">
              {this.config['show_table_header']&&<tr>
                <th><input type="checkbox" title="Select all"/></th>
                <th>ID</th>
                {this.config.columns.map( (column)=>{
                  let sortable = this.config.sort.indexOf( column )!=-1;
                  let sortOrder = this.state.sortby[0][0] == column? this.state.sortby[0][1]:'';
                  return (<th>{sortable?<a href="#" onClick={(e)=>{this.sort(e, column);}} className={"column-sortable "+sortOrder}>{column}</a>:column}</th>) //todo: use name from definition.
                } )}
                <th>Actions</th>
                </tr>}
              {this.renderRows(data)}
            </table>
            <div className="text-right">
            <span className="dm-pagination">
              <a href="#" className="page-first" onClick={(e)=>{e.preventDefault();this.setState({currentPage: 0});}}><i className="fas fa-step-backward"></i></a>
              <a href="#" className="page-previous" onClick={(e)=>{e.preventDefault();if(this.state.currentPage>0){this.setState({currentPage: this.state.currentPage-1});}}}><i className="fas fa-chevron-left"></i></a>
              <a href="#" className="page-next" onClick={(e)=>{e.preventDefault();if(this.state.currentPage<totalPage-1){this.setState({currentPage: this.state.currentPage+1});}}}><i className="fas fa-chevron-right"></i></a>
              <a href="#" className="page-last" onClick={(e)=>{e.preventDefault();this.setState({currentPage: totalPage-1});}}><i className="fas fa-step-forward"></i></a>
              <a href="#" title="Reload data" onClick={(e)=>{e.preventDefault();this.fetchData();}}><i className="fas fa-sync"></i></a>

              <span className="pagination-info">Page {this.state.currentPage+1} of {totalPage} from total {this.state.list.count}</span>
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
            return '<div className="loading"></div>';
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
                {this.renderList(this.state.list.list)}
            </div>
        );
    }
}
