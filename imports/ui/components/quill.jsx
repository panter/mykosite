import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions} from 'material-ui';

var onTextChange = function(value) {
  console.log(value);
}

var showValue = function(value) {
  $('.quill').html("<a href='test'>yourDocumentName</a>");
}

const Quill = ({document}) => (<Card className="quill">
    <CardText>
      <ReactQuill theme="snow" value={document.text} onChange={onTextChange}/>
    </CardText>
    <CardActions className="bottom">
      <RaisedButton label="Speichern" primary={true} onClick={showValue} />
      <RaisedButton label="Abbrechen" secondary={true} />
    </CardActions>
  </Card>
)

export default Quill
