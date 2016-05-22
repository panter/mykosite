import React from 'react';
import ReactQuill from 'react-quill';
import {RaisedButton} from 'material-ui';

var onTextChange = function(value) {
  console.log(value);
}

export default Quill = ({name}) => (
  <div>
    <ReactQuill theme="snow" value='Welcome to text to internet' onChange={onTextChange}/>
    <div className="bottom">
      <RaisedButton label="Speichern" primary={true} />
      <RaisedButton label="Abbrechen" secondary={true} />
    </div>
  </div>
)
