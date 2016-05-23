import React from 'react';
import {Paper} from 'material-ui';

const Links = ({document}) => {
  if (!document) {
    return <div>No doc</div>
  }
  return (<Paper className="links">
      <span>
        View link: &nbsp;
        <a href={'/' + document.name}>{window.location.host}/{document.name}</a>
      </span>
      &nbsp; &nbsp; &nbsp;   
      <span>
        Edit link: &nbsp;
        <a href={'/' + document._id} >{window.location.host}/{document._id}</a>
      </span>
  </Paper>)
}

export default Links
