import {composeWithTracker} from 'react-komposer'
import Links from '/imports/ui/components/links.jsx'
import { Documents } from '/imports/api/Documents.js'

function composer (props, onData) {
  const handle = Meteor.subscribe('documents', Session.get('documentId'));
  if (handle.ready()) {
    const document = Documents.findOne({});
    onData(null, {document});
  };
};

export default composeWithTracker(composer)(Links);
