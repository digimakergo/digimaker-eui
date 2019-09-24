import * as React from 'react';
import Moment from 'react-moment';

export default class Actions extends React.Component<{content:any}> {




  render () {
    return (
       <div className="tool-block">
         <div className="block-title">Actions</div>
         <div className="block-body">
<div>
             <a href="#"><i className="fas fa-tools"></i> View in frontpage</a>
            </div>
            <div>
             <a href="#"><i className="fas fa-tools"></i> Copy</a>
            </div>
            <div>
             <a href="#"><i className="fas fa-tools"></i> Move</a>
            </div>
<div>
             <a href="#"><i className="fas fa-tools"></i> Export</a>
            </div>
<hr />
<div>
             <a href="#"><i className="fas fa-tools"></i> Sync with clusers</a>
            </div>

         </div> 
       </div>
    );
  }
}
