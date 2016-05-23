import {composeWithTracker} from 'react-komposer'
import Quill from '/imports/ui/components/quill.jsx'
import { Documents } from '/imports/api/Documents.js'
import { Session } from 'meteor/session'

function composer (props, onData) {
  const handle = Meteor.subscribe('documents', Session.get('documentId'));
  if (handle.ready()) {
    const document = Documents.findOne({});
    var editable = document._id == FlowRouter.getQueryParam('uuid')
    onData(null, {document, editable});
  };
};

export default composeWithTracker(composer)(Quill);
