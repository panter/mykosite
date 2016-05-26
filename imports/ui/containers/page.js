import {composeWithTracker} from 'react-komposer'
import Page from '/imports/ui/components/page.jsx'
import { Documents } from '/imports/api/Documents.js'

function composer (props, onData) {
  const name = FlowRouter.getQueryParam('page');
  subscription = Subs.subscribe('documentsByName', name);
  if (subscription.ready()) {
    const document = Documents.findOne({ name: name });
    onData(null, {document, name});
  }
}

export default composeWithTracker(composer)(Page);
