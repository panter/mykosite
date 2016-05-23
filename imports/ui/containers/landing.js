import React from 'react';
import {composeWithTracker} from 'react-komposer'

const Landing = () => (<div>Landing page coming soon...</div>)

function composer (props, onData) {
  onData(null, {});
};

export default composeWithTracker(composer)(Landing);
