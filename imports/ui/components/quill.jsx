import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions, Snackbar} from 'material-ui';

var onTextChange = function(doc, text) {
  doc.text = text;
}

var saveDocument = function(doc, saved) {
  Meteor.call('document.update', doc)
  saved = true;
}

var handleRequestClose = function () {
  //
}

const Quill = ({document, editable, saved}) => {
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
          <RaisedButton label="Speichern" primary={true} onClick={saveDocument.bind(this, document, saved)} />
          <RaisedButton label="Abbrechen" secondary={true} />
        </CardActions>
      </Card>
      <Snackbar
        open={saved}
        message="Document saved"
        autoHideDuration={4000}
        onRequestClose={handleRequestClose}
      />
    </div>
  )
}

export default Quill
