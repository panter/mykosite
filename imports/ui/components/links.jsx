import React from 'react';
import {Paper} from 'material-ui';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import PeopleIcon from 'material-ui/svg-icons/social/people';

const link = function (document, editable) {
  var path = '?' + document.name
  if (editable) {
    path += '&uuid=' + document._id
  }

  return <a href={path}>{window.location.host}{path}</a>;
}

const Links = ({document}) => {
  if (!document) {
    return <div></div>
  }
  return (<Paper className="links section">
      <span>
        View link: &nbsp; {link(document, false)}
      </span>
      &nbsp; &nbsp; &nbsp;
      <span>
        Edit link: &nbsp; {link(document, true)}
      </span>
    <Badge badgeContent={document.watchingCount} secondary={true} className="badge" > <EyeIcon /> </Badge>
    <Badge badgeContent={document.visitorsCount} secondary={true} className="badge" > <PeopleIcon /> </Badge>
  </Paper>)
}

export default Links
