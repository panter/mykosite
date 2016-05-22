import {composeWithTracker} from 'react-komposer'
import Links from '/imports/ui/components/links.jsx'
import { Documents } from '/imports/api/Documents.js'

function composer (props, onData) {
  const handle = Meteor.subscribe('documents');
  if (handle.ready()) {
    const document = Documents.findOne(Documents.insert({}));
    onData(null, {document});
  };
};

export default composeWithTracker(composer)(Links);
