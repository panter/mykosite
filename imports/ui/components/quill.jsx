import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton, Card, CardText, CardActions} from 'material-ui';

var onTextChange = function(value) {
  console.log(value);
}

var value = '<div> <span style="font-size: 18px;">Welcome to your μPage</span> </div> <div> <br> </div> <div> <span style="font-size: 14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut nisi massa. Cras malesuada commodo dolor in ultricies. Morbi tempor enim sed dolor vulputate iaculis. Curabitur volutpat, ipsum eget suscipit laoreet, neque odio fringilla erat, in mattis est felis vel metus. Morbi lacinia tellus ac varius maximus. Proin id dolor elit. Nulla</span> </div>';

export default Quill = ({name}) => (
  <Card className="quill">
    <CardText>
      <ReactQuill theme="snow" value={value} onChange={onTextChange}/>
    </CardText>
    <CardActions className="bottom">
      <RaisedButton label="Speichern" primary={true} />
      <RaisedButton label="Abbrechen" secondary={true} />
    </CardActions>
  </Card>
)
