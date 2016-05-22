import {composeWithTracker} from 'react-komposer'
import Document from 'Documentview'

function composer (props, onData) {
  const handle = Meteor.subscribe('documents');
  if (handle.ready()) {
    const document = Documents.findOne();
    onData(null, {document});
  };
};

export default composeWithTracker(composer)(Document);
