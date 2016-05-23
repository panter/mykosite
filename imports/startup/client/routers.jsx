import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Quill from '/imports/ui/components/quill.jsx'
import Document from '/imports/ui/containers/documents.js'
import Links from '/imports/ui/containers/links.js'
import Landing from '/imports/ui/containers/landing.js'


var findOrCreateDocument = function (id) {
    Meteor.call('findOrCreateDocument', id, (error, result) => {
      if (error) {
        return;
      }
      Session.set({ documentId: result })
    });
}

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

FlowRouter.route("/:id", {
  action (params, queryParams) {
    findOrCreateDocument(params.id)
    mount(AppContainer, {
      content: <div>
          <Document/>
          <Links />
      </div>
    });
  }
});
