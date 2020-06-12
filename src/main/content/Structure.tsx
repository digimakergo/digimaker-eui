import * as React from 'react';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {FetchWithAuth} from '../../ui/util';
import TreeNode from "../../ui/TreeNode";

export default class Structure extends React.Component<{content:any},{data:any}> {
  constructor(props: any) {
    super(props);
    this.state = { data: '' };
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData() {
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/treemenu/1')
      .then(res => res.json())
      .then((data) => {
        this.setState({ data: data });
      })

  }

  renderNode(node:any){
    return <span className="tree-text">
    <i className={"nodeicon far icon-" + node.content_type + " icon-subtype-" + node.fields.subtype}></i>
    {node.name}
    <span>&nbsp;<i className="fas fa-plus"></i>&nbsp; <i className="far fa-edit"></i>&nbsp; <i className="far fa-trash-alt"></i></span>
    </span>
  }

  render(){
    return <div>
      <h2>Content structure</h2>
      <h3>{this.state.data.name}</h3>
      <TreeNode data={this.state.data} renderItem={this.renderNode} />
      <div><button className="btn btn-primary btn-sm"><i className="fas fa-plus"></i>&nbsp;New </button></div>
    </div>
  }
}
