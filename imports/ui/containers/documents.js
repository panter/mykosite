import {composeWithTracker} from 'react-komposer'
import Document from '/client/components/pictureList.jsx'

function composer (props, onData) {
  const handle = Meteor.subscribe('pictures');
  if (handle.ready()) {
    const pictures = Pictures.find().fetch();
    onData(null, {pictures});
  };
};

export default composeWithTracker(composer)(PictureList);
