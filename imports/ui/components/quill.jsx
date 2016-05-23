import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions, Snackbar} from 'material-ui';

var onTextChange = function(doc, text) {
  doc.text = text;
  doc.saved = false;
}

var saveDocument = function(doc) {
  doc.saved = true;
  Meteor.call('document.update', doc)
}

var handleRequestClose = function () {
  //
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
          <RaisedButton label="Abbrechen" secondary={true} />
        </CardActions>
      </Card>
      <Snackbar
        open={document.saved}
        message="Document saved"
        autoHideDuration={4000}
      />
    </div>
  )
}

export default Quill
