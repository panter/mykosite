import React from 'react';
import {Paper, TextField, Divider, IconButton} from 'material-ui';
import ReactQuill from 'react-quill';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentSave from 'material-ui/svg-icons/content/save';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import CopyEditIcon from 'material-ui/svg-icons/editor/border-color';
import ImagePictureAsPdf from 'material-ui/svg-icons/image/picture-as-pdf';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {Documents} from '/imports/api/Documents.js';
import Badge from 'material-ui/Badge';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import PeopleIcon from 'material-ui/svg-icons/social/people';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

var text;
var dirty = new ReactiveVar(false);

const create = (name) => {
  Meteor.call('document.insert', {name: name});
  edit(Documents.findOne({name: name}));
};

const edit = (document) => {
  text = document.text;
  document.editing = Meteor.userId();
  Meteor.call('document.update', document);
  dirty.set(false);
};

const change = (newText) => {
  text = newText;
  dirty.set(true);
};

const cancel = (document) => {
  document.editing = null;
  Meteor.call('document.update', document);
  dirty.set(false);
};

const save = (document) => {
  document.text = text;
  document.editing = null;
  Meteor.call('document.update', document);
  dirty.set(false);
};

const editLink = function (document) {
  var path = '?' + document.name + '&token=' + document.token;
  return window.location.host + path;
}

const createMenu = (document) => {
  var items = [];

  items.push(
      <MenuItem primaryText='Save as PDF'
                leftIcon={<ImagePictureAsPdf />}
                onClick={exportAsPdf.bind(this, document)}/>)

  if (Documents.helpers.canEdit(document)) {
    items.push(<Divider />)
    // Copy Editable Link
    items.push(<MenuItem primaryText='Copy Editable Link...'
                className="clipboard" data-clipboard-target="#edit-link"
                leftIcon={<CopyEditIcon />}/>)
    items.push(<input type="text" id="edit-link" value={editLink(document)} style={{position: 'absolute', left: '-400px'}} />)

    // Delete
    items.push(<MenuItem primaryText='Delete...'
                leftIcon={<DeleteIcon />}
                className="delete-menuitem"/>)
  }
  
  return (
    <IconMenu
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>} >
        {items}
    </IconMenu>
    )
      //<MenuItem onClick={exportAsPdf.bind(this, document)} disabled={Documents.helpers.isEditing(document)} leftIcon={<ImagePictureAsPdf />}/>
}

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
  console.log($('.page-content'))
  $('.page-content').toggleClass('fullscreen-on')
});
const toggleFullscreen = function () {
  var el = $('.page-content')[0];
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};

const exportAsPdf = (document) => {
  var pdf = new jsPDF();
  pdf.setFontSize(24);
  pdf.text(15, 15, document.name);
  pdf.fromHTML($('.page-content').get(0), 15, 20, {
    'width': 180
  });
  pdf.save(document.name + '.pdf');
};

const createButtons = (document, name) => {
  if (!document) {
    return <div className="page-toolbar">
      <div className="button-group">
        <IconButton onClick={create.bind(this, name)} disabled={name == null}>
          <AddCircle />
        </IconButton>
      </div>
    </div>
  }

  var result = [];
  
  // Fullscreen
  if (!Documents.helpers.isEditing(document)) {
    result.push(
      <div className="button-group">
       <IconButton onClick={toggleFullscreen}><Fullscreen/></IconButton>
      </div>)
  }


  // Edit
  if (Documents.helpers.canEdit(document) && !Documents.helpers.isEditing(document)) {
    result.push(
      <div className="button-group">
        <IconButton onClick={edit.bind(this, document)}> <EditorModeEdit /> </IconButton>
      </div>)
    }
    
  // Abbrechen
  if (Documents.helpers.isEditing(document)) {
    result.push(
      <div className="button-group">
        <IconButton onClick={cancel.bind(this, document)}> <NavigationCancel /> </IconButton>
      </div>)
  }

  // Save
  if (dirty.get()) {
    result.push(
      <div className="button-group">
        <IconButton onClick={save.bind(this, document)}> <ContentSave /> </IconButton>
      </div>)
  }

  if (!dirty.get()) {
    result.push(<div className="button-group">{ createMenu(document) }</div>)
  }
  return <div className="page-toolbar">{result}</div>
};

const createContent = (document) => {
  if (Documents.helpers.isEditing(document)) {
    return <ReactQuill theme="snow" value={text} onChange={change}/>
  } else if (document) {
    return (<div className="page-content">
      <div dangerouslySetInnerHTML={{__html: document.text}}/>
      <Badge badgeContent={document.watchingCount} primary={true} className="watching-badge badge" > <EyeIcon /> </Badge>
      <Badge badgeContent={document.visitorsCount} secondary={true} className="visitors-badge badge" > <PeopleIcon /> </Badge>
      </div>)
  } else {
    return <div className="page-content"/>
  }
};

const Page = ({document, name}) => {
  return (
    <Paper className="page" zDepth="2">
      <div className="pagebar">
        <h1>{name}</h1>
        { createButtons(document, name) }
      </div>
      <Divider />
      { createContent(document) }
    </Paper>
  )
};

export default Page
