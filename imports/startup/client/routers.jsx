import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Quill from '/imports/ui/components/quill.jsx'
import Document from '/imports/ui/containers/documents.js'
import Links from '/imports/ui/containers/links.js'
import Landing from '/imports/ui/containers/landing.js'

FlowRouter.route("/", {
  action () {
    mount(AppContainer, {
      content: <div>
          <Landing />
          <Document />
          <Links />
      </div>
    });
  }
});
