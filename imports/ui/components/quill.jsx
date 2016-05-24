import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions, Snackbar} from 'material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/content/create';

var text;
var saved = new ReactiveVar(false);
var dirty = new ReactiveVar(false);

var onTextChange = function(doc, txt) {
  dirty.set(true);
  text = txt;
};

var saveDocument = function(doc) {
  doc.text = text;
  dirty.set(false);
  saved.set(true);
  Meteor.call('document.update', doc);
  _.debounce(function () {
    saved.set(false);
  }, 2000)();
};

var deleteDocument = function (doc) {
  if (confirm('Do you want to delete the Document ' + doc.name)) {
    Meteor.call('document.remove', doc);
    FlowRouter.go('/');
  }
};

var editDocument = function (doc) {
  dirty.set(false);
  doc.editing = Meteor.userId();
  text = doc.text;
  Meteor.call('document.update', doc);
};

var closeDocument = function (doc) {
  doc.editing = null;
  Meteor.call('document.update', doc);
};

const Quill = ({document, editable, editing}) => {
  if (!document) {
    return <div></div>
  }
  if (!editing) {
    return <Card className="document section">
      <CardText>
          <div dangerouslySetInnerHTML={{__html: document.text}}/>
      </CardText>
      { editable ? <FloatingActionButton className="edit" onClick={editDocument.bind(this, document)}><ContentEdit/></FloatingActionButton> : '' }
    </Card>
  }

  return (
    <div>
      <Card className="quill">
        <CardText>
          <ReactQuill theme="snow" value={document.text} onChange={onTextChange.bind(this, document)}/>
        </CardText>
        <CardActions className="bottom">
          <RaisedButton label="Speichern" primary={true} onClick={saveDocument.bind(this, document)} disabled={!dirty.get()}/>
          <RaisedButton label={dirty.get() ? 'Verwerfen' : 'Schliessen'} default={true} onClick={closeDocument.bind(this, document)}/>
          <RaisedButton label="Dokument Löschen" secondary={true} onClick={deleteDocument.bind(this, document)}/>
        </CardActions>
      </Card>
      <Snackbar
        open={saved.get()}
        message="Document saved"
      />
    </div>
  )
}

export default Quill
