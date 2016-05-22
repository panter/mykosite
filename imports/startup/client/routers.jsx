import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Document from '/imports/ui/containers/documents.js'

FlowRouter.route("/", {
  action () {
    mount(AppContainer, {
      content: <Document/>
    });
  }
});
