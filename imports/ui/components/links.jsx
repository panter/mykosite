import React from 'react';
import {Paper} from 'material-ui';

<<<<<<< 65a0f01d248c9b6d8ac3e4fe9ee0a47ac8d50c43
const link = function (document, editable) {
  var path = '/' + document.name
  if (editable) {
    path += '?uuid=' + document._id
  }

  return <a href={path}>{window.location.host}{path}</a>;
}

const Links = ({document}) => {
  if (!document) {
    return <div>No doc</div>
  }
  return (<Paper className="links">
      <span>
        View link: &nbsp; {link(document, false)}
      </span>
      &nbsp; &nbsp; &nbsp;
      <span>
        Edit link: &nbsp; {link(document, true)}
      </span>
  </Paper>)
}

export default Links
