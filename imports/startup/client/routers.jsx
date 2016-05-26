import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Quill from '/imports/ui/components/quill.jsx'
import Document from '/imports/ui/containers/documents.js'
import Links from '/imports/ui/containers/links.js'
import Landing from '/imports/ui/containers/landing.js'

FlowRouter.route("/", {
  action () {
    var token = FlowRouter.getQueryParam('token');
    if (token) {
      Meteor.call('user.addToken', token);
    }
    document.title = "Mykosite";
    mount(AppContainer);
  }
});

FlowRouter.route("/:docName", {
  action (params) {
    Session.set('documentName', params.docName);
    mount(AppContainer);
  }
});
