import * as React from 'react';
import Moment from 'react-moment';
import LoadFields from '../ui/LoadFields';

export default class ViewContent extends React.Component<{content:any},{definition: any}> {


  constructor(props: any) {
      super(props);
      this.state = { definition: ''};
  }

  //when init
  componentDidMount() {
      this.fetchData( this.props.content.content_type );
  }

  fetchData(id) {
      fetch(process.env.REACT_APP_REMOTE_URL + '/contenttype/get/' + id)
          .then(res => res.json())
          .then((data) => {
              this.setState({ definition: data });
          })
  }


  render () {
    let content = this.props.content;
    let definition = this.state.definition
    return (
       <div>
              <LoadFields type={content.content_type} validation='' mode='view' data={content} afterField={()=>{}} />
       </div>
    );
  }
}
