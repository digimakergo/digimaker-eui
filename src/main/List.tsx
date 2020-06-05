import * as React from 'react';
import Moment from 'react-moment';
import Config from '../dm.json';
import Create from '../actions/Create';
import {FetchWithAuth, getDefinition, getFields, getCommonFieldName} from '../utils/util';
import ListRowActions from './ListRowActions';
import Actions from './Actions';
import FieldRegister from '../ui/FieldRegister';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

export default class List extends React.Component<{ id: number, contenttype: string }, {def:any, loading:boolean, list: any, actionNew: boolean, currentPage:number, sortby: Array<Array<string>>, selected: Array<number> }> {

   private config: any

    constructor(props: any) {
        super(props);
        this.config = Config.list[this.props.contenttype]
        this.state = { def:'',list: '', loading: true, actionNew: false, currentPage: 0, sortby:this.config['sort_default'], selected:[]};
    }


    getSortbyStr(sortby:Array<Array<string>>){
      let arr:Array<string> =[];
      sortby.map((item)=>{
        arr.push( item.join(' ') );
       });
       return arr.join('%3B');
    }

    //callback after an action is done.
    afterAction(refresh:boolean){
      if(refresh){
        this.refresh();
      }
    }

    fetchData() {
        let id = this.props.id;
        let sortby = "sortby="+this.getSortbyStr( this.state.sortby );
        let limit = "";
        let pagination = this.config.pagination;
        if(  pagination!= -1 ){
            limit = "&limit="+pagination+"&offset="+pagination*this.state.currentPage
        }
        this.setState({loading: true});
        FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/list/' + id+'/'+this.props.contenttype+'?'+sortby+limit)
            .then(res => res.json())
            .then((data) => {
                this.resetActionState();
                this.setState({ loading: false, list: data });
            })
    }

    refresh(){
      this.fetchData();
    }

    resetActionState(){
      this.setState({selected:[]});
    }


    //sort by column
    sort(e, column){
      e.preventDefault();
      let sortby = this.state.sortby;
      let newSortBy:Array<Array<any>> =[];

      //create new sort or change sort based on column
      let createSort = (sort?:any)=>{
        let order = 'asc';
        if( sort && sort[0] == column ){
            order = sort[1]=='desc'?'asc':'desc';
        }
        return [column, order];
      }

      //if there is swift key, keep the first sort
      if( e.shiftKey && sortby.length >=1 ){
        if(sortby.length == 2){
          newSortBy[0] = sortby[0];
          newSortBy[1] = createSort(sortby[1]);
        }else if(sortby.length == 1){
          newSortBy = [sortby[0],createSort()];
        }
      }else{
        newSortBy = [createSort(sortby?sortby[0]:null)]
      }
      this.setState({sortby:newSortBy, currentPage:0});
    }

    //when init
    componentDidMount() {
        this.fetchData();

        getDefinition(this.props.contenttype)
        .then(res=>res.json())
        .then((data)=>{
            this.setState({def:data});
        });
    }

    //when state changed
    componentDidUpdate( prevProps, prevState, snapshot ){
      //when changing page
      if( prevState.currentPage != this.state.currentPage
        || this.getSortbyStr( prevState.sortby ) != this.getSortbyStr( this.state.sortby )
        || prevProps.id != this.props.id
        || prevProps.contenttype != this.props.contenttype)
      {
        this.config = Config.list[this.props.contenttype];
        this.fetchData();
      }
    }


    select(id){
      let selected = this.state.selected;
      if(selected[id]){
          delete selected[id];
      }else{
        let content = this.state.list.list.find((value)=>{return value.id==id});
        selected[id]=content.name;
      }
      this.setState({selected:selected});
    }

    selectAll(){
      let list = this.state.list.list;
      let selected:any={};
      for(let value of list){
        let id = value.id;
        if( !this.state.selected[id] ){
            selected[value.id]=value.name;
        }
      };
      this.setState({selected: selected});
    }

    renderRows(list) {
        let rows: Array<any> = [];
        let fieldsDef = getFields(this.state.def);
        for (let i = 0; i < list.length; i++) {
            let content = list[i]
            rows.push(<tr>
              <td onClick={()=>this.select(content.id)} className="td-check center"><input type="checkbox" checked={this.state.selected[content.id]?true:false} value="1" /></td>
              <td onClick={()=>this.select(content.id)} className="td-id">{content.id}</td>
              {this.config.columns.map((column)=>{
                  {/*render fields, todo: use lazy load*/}
                  if( fieldsDef[column] ){
                    const fieldtype = fieldsDef[column].type;
                    const Fieldtype: React.ReactType = FieldRegister.getFieldtype(fieldtype);
                    let output = (<Fieldtype definition={fieldsDef[column]} data={content[column]}  mode='inline' />);
                    if( fieldtype == 'image' ){
                      return <td>
                            <span data-tip data-for={"image"+content.id}>{output}</span>
                              <ReactTooltip border={true} borderColor='#000000' className="tooltip" id={'image'+content.id} clickable={true} place="right" effect='float' type='light'>
                              {output}
                            </ReactTooltip></td>
                    }
                    return <td></td>
                  }
                  {/*render common fields*/}
                  switch(column){
                    case 'name':
                      return (<td className="content-name"><span><Link to={"/main/"+content.id}>{content.name}</Link></span></td>);
                    case 'author':
                      return (<td>{content.author}</td>)
                    case 'published':
                      return (<td><Moment unix format="DD.MM.YYYY HH:mm">{content.published}</Moment></td>)
                    case 'modified':
                      return <td><Moment unix format="DD.MM.YYYY HH:mm">{content.modified}</Moment></td>
                    case 'priority':
                      return (<td title="Priority">{content[column]?content[column]:''}</td>)
                    case 'status':
                        return (<td><span className={"workflow-status status-"+content.status}></span></td>)
                    default:
                      return <td className={"column-"+column}>{content[column]?content[column]:''}</td>
                    break;
                  }
              })}
                {this.config['row_actions'].length>0&&<td className="list-row-tool">
                      <ListRowActions content={content} config={this.config['row_actions']} />
                  </td>}
              </tr>)
        }
        return rows;
    }

    renderList(data) {
        let totalPage = Math.ceil( this.state.list.count/this.config.pagination);
        let fieldsDef = getFields(this.state.def);
        return (<div>
            {this.config.show_header&&<h3>{this.state.def.name}({this.state.list.count})</h3>}
            <table className="table"><tbody>
              {this.config['show_table_header']&&<tr>
                <th className="center" onClick={()=>this.selectAll()}>
                  <a href="#"><i className="far fa-check-square"></i></a>
                </th>
                <th><a href="#" onClick={(e)=>{this.sort(e, 'id');}} className={'column-sortable '+(this.state.sortby[0][0] == 'id'? this.state.sortby[0][1]:'')}>ID</a></th>
                {this.config.columns.map( (column)=>{
                  let sortable = this.config.sort.indexOf( column )!=-1;
                  let sortby = this.state.sortby;
                  let sortOrder = ''
                  if( sortby[0][0] == column ){
                    sortOrder = sortby[0][1];
                  }else if( sortby[1] && sortby[1][0] == column ){
                    sortOrder = 'sort-second ' + sortby[1][1];
                  }
                  let columnName = fieldsDef[column]?(fieldsDef[column].name):getCommonFieldName(column);
                  return (<th>
                    {sortable?
                      <a href="#" onClick={(e)=>{this.sort(e, column);}} className={"column-sortable "+sortOrder}>
                      {columnName}
                      </a>
                      :columnName}
                      </th>) //todo: use name from definition.
                } )}
                {this.config['row_actions'].length>0&&<th></th>}
                </tr>}
              {this.renderRows(data)}
              {this.state.currentPage>0&&this.renderEmpties(this.config.pagination-data.length)}
              </tbody>
            </table>
            <div className="text-right">
            {totalPage>1&&<span className="dm-pagination">
              {this.state.loading&&<span className="loading"></span>}
              <a href="#" className="page-first" onClick={(e)=>{e.preventDefault();this.setState({currentPage: 0});}}><i className="fas fa-step-backward"></i></a>
              <a href="#" className="page-previous" onClick={(e)=>{e.preventDefault();if(this.state.currentPage>0){this.setState({currentPage: this.state.currentPage-1});}}}><i className="fas fa-chevron-left"></i></a>
              <a href="#" className="page-next" onClick={(e)=>{e.preventDefault();if(this.state.currentPage<totalPage-1){this.setState({currentPage: this.state.currentPage+1});}}}><i className="fas fa-chevron-right"></i></a>
              <a href="#" className="page-last" onClick={(e)=>{e.preventDefault();this.setState({currentPage: totalPage-1});}}><i className="fas fa-step-forward"></i></a>
              <a href="#" title="Reload data" onClick={(e)=>{e.preventDefault();this.refresh()}}><i className="fas fa-sync"></i></a>

              <span className="pagination-info">Page {this.state.currentPage+1} of {totalPage} from total {this.state.list.count}</span>
              </span>}
            </div>
        </div>
        )
    }

    //render empty so the pagination buttons can be in fixed place
    renderEmpties(count:number){
      let list:Array<any> = [];
      for(let i =0;i<count;i++){
        list.push(<tr className="empty-row"><td>&nbsp;</td></tr>);
      }
      return list;
    }

    newContent = () => {
        this.setState({ actionNew: true });
    }

    render() {
        if( !this.state.list || !this.state.def ){
            return (<div className="loading"></div>);
        }
        if(this.state.list.count==0){
          return (<div className="alert alert-info">No {this.props.contenttype} found.</div>)
        }

        return (
            <div>
                <div className="content-list-tools">
                     {!this.config.show_table_header&&
                          <a href="#" onClick={(e)=>{e.preventDefault();this.selectAll()}}>
                            <i className="fas fa-check-square"></i>
                            Select
                          </a>
                     }
                    {/*todo: give message if it's not selected(may depend on setting) */}
                    <Actions selected={this.state.selected} actionsConfig={this.config.actions} afterAction={(refresh:boolean)=>this.afterAction(refresh)} />
                    {!this.config.show_table_header&&
                    <span>
                        <i className="fas fa-sort-alpha-up"></i> &nbsp;
                        <select className="form-control">
                            <option>Published</option>
                            <option>Modified</option>
                        </select>
                    </span>
                  }
                  &nbsp;&nbsp;<a href="#" title="Thumbnail"><i className="fas fa-th"></i></a>

                </div>
                {this.renderList(this.state.list.list)}
            </div>
        );
    }
}
