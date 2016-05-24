import React from 'react';
import {Paper} from 'material-ui';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import PeopleIcon from 'material-ui/svg-icons/social/people';

const editLink = function (document) {
  var path = '?' + document.name + '&token=' + document.token;
  return <a href={path}>{window.location.host}{path}</a>;
}

const viewLink = function (document) {
    var path = '/' + document.name;
    return <a href={path}>{window.location.host}{path}</a>;
}

const Links = ({document}) => {
  if (!document) {
    return <div></div>
  }
  return (<Paper className="links section">
      <span>
        View link: &nbsp; {viewLink(document)}
      </span>
      &nbsp; &nbsp; &nbsp;
      <span>
        Edit link: &nbsp; {editLink(document)}
      </span>
    <Badge badgeContent={document.watchingCount} secondary={true} className="badge" > <EyeIcon /> </Badge>
    <Badge badgeContent={document.visitorsCount} secondary={true} className="badge" > <PeopleIcon /> </Badge>
  </Paper>)
}

export default Links
