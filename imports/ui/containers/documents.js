import {composeWithTracker} from 'react-komposer'
import Quill from '/imports/ui/components/quill.jsx'
import { Documents } from '/imports/api/Documents.js'
import { Session } from 'meteor/session'

function composer (props, onData) {
  const handle = Subs.subscribe('documentsByName', Session.get('documentName'));
  if (handle.ready()) {
    const document = Documents.findOne({ name: Session.get('documentName')});
    const docName = FlowRouter.getParam("docName");
    var editing = document && document.editing == Meteor.userId() && !docName;
    var editable = Documents.helpers.canEdit(document) && !docName && !document.editing;
    onData(null, {document, editable, editing});
  }
}

export default composeWithTracker(composer)(Quill);
