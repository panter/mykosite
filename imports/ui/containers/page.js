import {composeWithTracker} from 'react-komposer'
import Page from '/imports/ui/components/page.jsx'
import { Documents } from '/imports/api/Documents.js'

function composer (props, onData) {
  const handle = Subs.subscribe('documentsByName', Session.get('documentName'));
  if (handle.ready()) {
    const document = Documents.findOne({ name: Session.get('documentName') });
    onData(null, {document, name});
  }
}

export default composeWithTracker(composer)(Page);
