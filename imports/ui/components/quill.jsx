import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions} from 'material-ui';

var onTextChange = function(doc, text) {
  console.log(text);
  console.log(doc);
  doc.text = text;
  // document.text = value;
  // console.log(document);
}

var saveDocument = function(doc) {
  console.log('saved')
  console.log(doc);
  Meteor.call('document.update', doc)
}

const Quill = ({document}) => {
  if (!document) {
    return <div>No doc</div>
  }
  return (
    <Card className="quill">
      <CardText>
        <ReactQuill theme="snow" value={document.text} onChange={onTextChange.bind(this, document)}/>
      </CardText>
      <CardActions className="bottom">
        <RaisedButton label="Speichern" primary={true} onClick={saveDocument.bind(this, document)} />
        <RaisedButton label="Abbrechen" secondary={true} />
      </CardActions>
    </Card>
  )
}

export default Quill
