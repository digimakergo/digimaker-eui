import * as React from 'react';
import {useEffect} from 'react';
import { FetchWithAuth, useDialog, Dialog } from 'digimaker-ui/util';

const Delete = (props) => {

  //let body= [<h4>are you sure?</h4>];
  const { isShowing, toggle } = useDialog();
  useEffect(() => {
    toggle();
  }, []);

  const close = () => { toggle(); }

  const body = () => {
    return (<div><h4>Are you sure to delete(including children)?</h4>
      <ul>
        {Object.keys(props.selected).map((id) => {
          return <li>{props.selected[id]}</li>
        })}
      </ul></div>)
  }

  const submit = () => {
    let ids = Object.keys(props.selected);
    let idStr = ids.join(',');
    FetchWithAuth(process.env.REACT_APP_REMOTE_URL + '/content/delete?id=' + idStr)
      .then(res => res.text())
      .then((text) => {
        if (text == 1) {
          let jumpToParent = false;
          if (ids.length == 1 && props.from && props.from.id == ids[0]) {
            jumpToParent = true;
          }
          props.afterAction(true, jumpToParent);
          close();
        } else {
          // this.setState({error:text});
        }
      });
  }

  return (
    <Dialog body={body()} title="Delete" submit={submit} isShowing={isShowing} hide={toggle} />
  );
};

export default Delete;
