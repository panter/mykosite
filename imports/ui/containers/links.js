import {composeWithTracker} from 'react-komposer'
import Links from '/imports/ui/components/links.jsx'
import { Documents } from '/imports/api/Documents.js'

function composer (props, onData) {
  const name = Session.get('documentName');
  const handle = Subs.subscribe('documentsByName', name);
  if (handle.ready()) {
    const document = Documents.findOne({ name: name })
    onData(null, {document, name});
  };
};

export default composeWithTracker(composer)(Links);
