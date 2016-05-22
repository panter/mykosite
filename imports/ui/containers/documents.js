import {composeWithTracker} from 'react-komposer'
import Quill from '/imports/ui/components/quill.jsx'
import { Documents } from '/imports/api/Documents.js'

function composer (props, onData) {
  let id = FlowRouter.getParam('id');
  const handle = Meteor.subscribe('documents', id);
  if (handle.ready()) {
    const document = Documents.findOne();
    onData(null, {document});
  };
};

export default composeWithTracker(composer)(Quill);
