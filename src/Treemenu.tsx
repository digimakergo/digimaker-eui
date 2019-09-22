import * as React from 'react';

export default class Treemenu extends React.Component<{},{data:any}> {
  
constructor(props:any) {
      super(props);
this.state = {data : ''};
    }


  fetchData(){
   fetch('http://demo.digimaker.no:8089/api/content/treemenu/55' )
         .then(res=>res.json())
         .then( (data1) => {
           this.setState({data : data1});

         } )
  }

 componentWillMount(){
  this.fetchData();
 }

 renderNode(node: any): string{
   var currentStr = '<li><a href="#">'+node.name+'</a>'; 
   if( node.children ) 
   {
   currentStr = currentStr+'<ul>';
   for( var i=0; i< node.children.length;i++ )
   {
      currentStr = currentStr + this.renderNode(node.children[i]);
   }
   currentStr = currentStr + '</ul>';
   }
   currentStr = currentStr+'</li>';
   return currentStr;
}


  render () {
    return (
         <ul className="treemenu" dangerouslySetInnerHTML={{__html: this.renderNode(this.state.data)}} />
    );
  }
}
