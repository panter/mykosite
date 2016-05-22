import {composeWithTracker} from 'react-komposer'
import Quill from '/imports/ui/components/quill.jsx'
import { Documents } from '/imports/api/Documents.js'

function composer (props, onData) {
  const handle = Meteor.subscribe('documents');
  if (handle.ready()) {
    const document = Documents.findOne(Documents.insert({}));
    onData(null, {document});
  };
};

export default composeWithTracker(composer)(Quill);
