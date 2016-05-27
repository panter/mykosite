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
import Slider from 'material-ui/Slider';

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
  return window.location.host + '/' + document.name + '?token=' + document.token;
};

const setTitle = (doc) => {
  document.title = "airySite" + (doc ? " " + doc.name : "");
};

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
    items.push(<input type="text" id="edit-link" value={editLink(document)}
                      style={{position: 'absolute', left: '-400px'}}/>)

    // Delete
    items.push(<MenuItem primaryText='Delete...'
                         leftIcon={<DeleteIcon />}
                         className="delete-menuitem"/>)
  }

  return (
    <IconMenu
      className={Documents.helpers.isEditing(document) ? 'hidden' : ''}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
      {items}
    </IconMenu>
  )
};

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function () {
  $('.fullscreen-canvas').toggleClass('fullscreen-on');
});

const toggleFullscreen = function () {
  var el = $('.fullscreen-canvas')[0];
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

const isEmpty = (s) => s == null || s == undefined || s.length == 0;


const createButtons = (document, name) => {
  if (!document) {
    return <div className="page-toolbar">
      <IconButton onClick={create.bind(this, name)} className={isEmpty(name) ? 'hidden' : ''}
                  tooltipPosition="top-left" tooltip="Create a new page">
        <AddCircle />
      </IconButton>
    </div>
  }

  const isEditing = Documents.helpers.isEditing(document);
  const canEdit = Documents.helpers.canEdit(document);

  //return <div className="page-toolbar">{result}</div>
  return <div className="page-toolbar">
    <IconButton onClick={toggleFullscreen} className={!isEditing ? '' : 'hidden'}
                tooltipPosition="top-left" tooltip="Enable fullscreen mode">
      <Fullscreen/>
    </IconButton>
    <IconButton onClick={edit.bind(this, document)} className={canEdit && !isEditing ? '' : 'hidden'}
                tooltipPosition="top-left" tooltip="Edit your page">
      <EditorModeEdit/>
    </IconButton>
    <IconButton onClick={save.bind(this, document)} className={dirty.get() ? '' : 'hidden'}
                tooltipPosition="top-left"
                tooltip="Save your changes. Your changes will be visible immediately to the visitors of your page.">
      <ContentSave/>
    </IconButton>
    <IconButton onClick={cancel.bind(this, document)} className={isEditing ? '' : 'hidden'}
                tooltipPosition="top-left" tooltip="Discard your changes">
      <NavigationCancel/>
    </IconButton>
    {createMenu(document)}
  </div>
};

var zoom = new ReactiveVar(0.25)

const zoomChange = function (e, value) {
  console.log(value)
  zoom.set(value)
};

const createContent = (document) => {
  setTitle(document);
  if (Documents.helpers.isEditing(document)) {
    return <ReactQuill theme="snow" value={text} onChange={change}/>
  } else if (document) {
    return (<div className="page-content">
      <div dangerouslySetInnerHTML={{__html: document.text}} style={{ zoom: (zoom.get() * 300).toString() + '%'}}/>
      <Badge badgeContent={document.watchingCount} primary={true} className="watching-badge badge"> <EyeIcon /> </Badge>
      <Badge badgeContent={document.visitorsCount} secondary={true} className="visitors-badge badge"> <PeopleIcon />
      </Badge>
    </div>)
  } else {
    if (!FlowRouter.current().params.docName) {
      return <div className="page-content" style={{ zoom: (zoom.get() * 300).toString() + '%'}}>
        <h1>Welcome to airySite!</h1>
        <p>On this site you can quickly publish your own content in real-time!</p>
        <p>Please start typing a name for your new page in the 'Page' search field on top of this page. If the page
          exist, it will be immediately displayed. If the page does not exist, you can create your own page...</p>
        <p>...just follow the short instructions that will appear.</p>
      </div>
    }

    return <div className="page-content" style={{ zoom: (zoom.get() * 300).toString() + '%'}}>
      <h1>This page does not exist (yet)</h1>
      <p>
        <ul>
          <li>The bad: The page name you are searching for does not exist.</li>
          <li>The good: You can create your own page here by just clicking the + button on top right of this page</li>
        </ul>
      </p>
      <p>Remember: All content you are providing here will be public. Do not publish sensitive data like passwords or
        personal information.</p>
      <p>You can edit this page anytime with your current browser (do not remove cached data). To keep the page under
        your control, save the "Edit link" in the top-right menu.</p>
    </div>
  }
};

const isZoomSupported = () => {
  const element = document.createElement('div');
  return 'zoom' in element.style;
};

const Page = ({document, name}) => {
  const hasZoom = isZoomSupported();
  return (
    <Paper className="page" zDepth={2}>
      <div className="pagebar">
        <h1>{name}</h1>
        { createButtons(document, name) }
      </div>
      <Divider className={hasZoom ? 'hidden' : ''} />
      <div className={'fullscreen-canvas' + (hasZoom ? ' zoomable' : '')}>
        <Slider defaultValue={0.5} className={'zoom-slider' + (hasZoom ? '' : ' hidden')} onChange={zoomChange}/>
        { createContent(document) }
      </div>
    </Paper>
  )
};

export default Page
