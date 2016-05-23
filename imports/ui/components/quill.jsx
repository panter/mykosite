import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions, Snackbar} from 'material-ui';

var onTextChange = function(doc, text) {
  doc.saved = false;
  doc.text = text;
}

var saveDocument = function(doc) {
  doc.saved = true;
  Meteor.call('document.update', doc);
}

var deleteDocument = function (doc) {
  if (confirm('Do you want to delete the Document ' + doc.name)) {
    Meteor.call('document.remove', doc);
  }
}

const Quill = ({document, editable}) => {
  if (!document) {
    return <div>No doc</div>
  }
  if (!editable) {
    return <Card className="document">
      <CardText>
          <div dangerouslySetInnerHTML={{__html: document.text}}/>
      </CardText>
    </Card>

  }

  return (
    <div>
      <Card className="quill">
        <CardText>
          <ReactQuill theme="snow" value={document.text} onChange={onTextChange.bind(this, document)}/>
        </CardText>
        <CardActions className="bottom">
          <RaisedButton label="Speichern" primary={true} onClick={saveDocument.bind(this, document)} />
          <RaisedButton label="Abbrechen" default={true} />
          <RaisedButton label="Dokument Löschen" secondary={true} onClick={deleteDocument.bind(this, document)}/>
        </CardActions>
      </Card>
      <Snackbar
        open={document.saved}
        message="Document saved"
      />
    </div>
  )
}

export default Quill
