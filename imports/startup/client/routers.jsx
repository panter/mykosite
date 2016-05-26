import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Quill from '/imports/ui/components/quill.jsx'
import Document from '/imports/ui/containers/documents.js'
import Links from '/imports/ui/containers/links.js'
import Landing from '/imports/ui/containers/landing.js'

var mounted = false;

const mountApp = () => {
  var name = FlowRouter.current().path.substr(1)
  Session.set({documentName: name});
  var token = FlowRouter.getQueryParam('token');
  if (token) {
    Meteor.call('user.addToken', token);
  }
  mount(AppContainer);
}

FlowRouter.route("/", {
  action: mountApp
});
FlowRouter.route("/:docName", {
  action: mountApp
});
