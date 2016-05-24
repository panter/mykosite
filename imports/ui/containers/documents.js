import {composeWithTracker} from 'react-komposer'
import Quill from '/imports/ui/components/quill.jsx'
import { Documents } from '/imports/api/Documents.js'
import { Session } from 'meteor/session'

function composer (props, onData) {
  const handle = Subs.subscribe('documentsByName', Session.get('documentName'));
  if (handle.ready()) {
    const document = Documents.findOne({ name: Session.get('documentName')});
    var editable = document && document.userId == Meteor.userId()
    var editing = document && document.editing == Meteor.userId()
    onData(null, {document, editable, editing});
  };
};

export default composeWithTracker(composer)(Quill);
