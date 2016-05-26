import React from 'react';
import {Paper, TextField, Divider, IconButton} from 'material-ui';
import ReactQuill from 'react-quill';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel';
import ContentSave from 'material-ui/svg-icons/content/save';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {Documents} from '/imports/api/Documents.js';

var text;
var dirty = new ReactiveVar(false);
var isFullscreen = new ReactiveVar(false);

const create = (name) => {
  var id = Meteor.call('document.insert', {name: name});
  FlowRouter.setQueryParams({uuid: id});
};

const edit = (document) => {
  document.editing = Meteor.userId();
  Meteor.call('document.update', document);
  text = document.text;
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

const toggleFullscreen = function () {
  var el = $('.page-content')[0];
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
    isFullscreen.set(true)
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
    isFullscreen.set(false)
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

const createButtons = (document, name) => {
  if (document) {
    return <div className="page-toolbar">
      <div className="button-group">
        <IconButton onClick={toggleFullscreen} disabled={Documents.helpers.isEditing(document)}>
          <Fullscreen/>
        </IconButton>
      </div>
      <div className="button-group">
        <IconButton onClick={edit.bind(this, document)}
                    disabled={!Documents.helpers.canEdit(document) || Documents.helpers.isEditing(document)}>
          <EditorModeEdit />
        </IconButton>
        <IconButton onClick={cancel.bind(this, document)}
                    disabled={!Documents.helpers.isEditing(document)}>
          <NavigationCancel />
        </IconButton>
        <IconButton onClick={save.bind(this, document)}
                    disabled={!dirty.get()}>
          <ContentSave />
        </IconButton>
      </div>
    </div>

  } else {
    return <div>
      <IconButton onClick={create.bind(this, name)}
                  disabled={name == null} style={{margin: '14px 0px'}}>
        <AddCircle />
      </IconButton>
    </div>
  }
};

const createContent = (document) => {
  if (Documents.helpers.isEditing(document)) {
    return <ReactQuill theme="snow" value={text} onChange={change}/>
  } else if (document) {
    return <div className="page-content" dangerouslySetInnerHTML={{__html: document.text}}/>
  } else {
    return <div className="page-content"/>
  }
};

const Page = ({document, name}) => {
  return (
    <Paper className="page" zDepth="2">
      <div className="pagebar">
        <h1>{name}</h1>
        {/*<EditorToolbar />*/}
        { createButtons(document, name) }
      </div>
      <Divider />
      {/*<Editor />*/}
      { createContent(document) }
    </Paper>
  )
};

export default Page
