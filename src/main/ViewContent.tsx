import * as React from 'react';
import Moment from 'react-moment';
import LoadFields from '../ui/LoadFields';

export default class ViewContent extends React.Component<{content:any},{}> {


  constructor(props: any) {
      super(props);
      this.state = {};
  }


  render () {

    let data:any = {};
    let content = this.props.content;
    Object.keys(content).map((key)=>{
      if( content[key].Raw != undefined ){
        data[key] = content[key].Raw;
      }
    });
    return (
       <div>
              <LoadFields type={content.content_type} validation='' mode='view' data={data} afterField={()=>{}} />
       </div>
    );
  }
}
