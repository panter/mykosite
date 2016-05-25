import React from 'react';
import {Paper, RaisedButton} from 'material-ui';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import { Documents } from '/imports/api/Documents.js';

const editLink = function (document) {
  var path = '?' + document.name + '&token=' + document.token;
  return <a href={path}>{window.location.host}{path}</a>;
}

const viewLink = function (document) {
    var path = '/' + document.name;
    return <a href={path}>{window.location.host}{path}</a>;
}

const createPDF = (document) => {
  var pdf = new jsPDF();
  pdf.fromHTML($('.document').get(0), 15, 15, {
    'width': 210
  });
  pdf.save('Test.pdf');
};

const Links = ({document}) => {
  if (!document || Documents.helpers.isEditing(document)) {
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
    <RaisedButton onClick={createPDF}>PDF</RaisedButton>
  </Paper>)
}

export default Links
