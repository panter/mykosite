import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Quill from '/imports/ui/components/quill.jsx'
import Document from '/imports/ui/containers/documents.js'
import Links from '/imports/ui/containers/links.js'

FlowRouter.route("/", {
  action () {
    mount(AppContainer, {
      content: <div>
          <Document />
          <Links />
      </div>
    });
  }
});

FlowRouter.route("/:id", {
  action (params, queryParams) {
    mount(AppContainer, {
      content: <Document />
    });
  }
});
