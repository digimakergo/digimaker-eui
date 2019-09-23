import * as React from 'react';
import Moment from 'react-moment';


export default class List extends React.Component<{id:string},{content:any,list:any}> {

constructor(props:any) {
      super(props);
      this.state = {content:'',list : ''};
    }


  fetchData(){
   fetch('http://demo.digimaker.no:8089/api/content/list/'+this.props.id )
         .then(res=>res.json())
         .then( (data) => {
           this.setState({list : data});

         } )
  }

 componentWillMount(){
  this.fetchData();
 }

  renderList( list ){
    let rows:Array<any> =[];
    for( let i=0;i<list.length;i++ ){
     var item = list[i]
     rows.push(<tr><td>{item.id}</td><td>{item.name}</td><td>{item.author}</td><td><Moment unix format="DD.MM.YYYY HH:mm">{item.modified}</Moment></td><td><Moment unix format="DD.MM.YYYY HH:mm">{item.published}</Moment></td><td>{item.priority}</td><td className="list-tool">
            <a href="/admindesign/content/view/120" className="action" title="Edit"><i className="far fa-edit"></i></a>&nbsp; 
            <a href="/content/delete/76" className="action" title="Remove"><i className="far fa-trash-alt"></i></a>&nbsp;
             <a href="#" className="action" title="More"><i className="fas fa-ellipsis-h"></i></a>
        </td></tr>)
   }
  return rows;
  }

  render () {
    return (
       <div><h2>Articles {this.state.list['article']?this.state.list['article'].length:''}</h2>{this.state.list?<table className="table">{this.renderList(this.state.list['article'])}</table>:''}</div>
    );
  }
}
