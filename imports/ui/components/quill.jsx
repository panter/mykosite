import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions} from 'material-ui';

var onTextChange = function(value) {
  console.log(value);
}

export default Quill = ({name}) => (
  <Card className="quill">
    <CardText>
      <ReactQuill theme="snow" value='Welcome to text to internet' onChange={onTextChange}/>
    </CardText>
    <CardActions className="bottom">
      <RaisedButton label="Speichern" primary={true} />
      <RaisedButton label="Abbrechen" secondary={true} />
    </CardActions>
  </Card>
)
