import React from 'react';
import {Paper, TextField, Divider, FlatButton} from 'material-ui';
import ReactQuill from 'react-quill';
import {Documents} from '/imports/api/Documents.js';

var text;
var dirty = new ReactiveVar(false);

const create = (name) => {
  var id = Meteor.call('document.insert', {name: name});
  FlowRouter.setQueryParams({uuid: id});
};

const edit = (document) => {
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

const createButtons = (document, name) => {
  if (document) {
    return <div>
      <FlatButton label="Edit"
                  onClick={edit.bind(this, document)}
                  disabled={Documents.helpers.isEditing(document)}
                  style={{margin: '14px 0px'}}/>
      <FlatButton label="Cancel" onClick={cancel.bind(this, document)}
                  disabled={!Documents.helpers.isEditing(document)}
                  style={{margin: '14px 0px'}}/>
      <FlatButton label="Save" onClick={save.bind(this, document)}
                  disabled={!dirty.get()} style={{margin: '14px 0px'}}/>
    </div>

  } else {
    return <div>
      <FlatButton label="Create" onClick={create.bind(this, name)}
                  disabled={name == null} style={{margin: '14px 0px'}}/>
    </div>
  }
};

const createContent = (document) => {
  if (Documents.helpers.isEditing(document)) {
    return <ReactQuill theme="snow" value={document.text} onChange={change}/>
  } else if (document) {
    return <div dangerouslySetInnerHTML={{__html: document.text}} style={{height: '441px', padding: '16px'}}/>
  } else {
    return <div style={{height: '441px', padding: '16px'}}/>
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
