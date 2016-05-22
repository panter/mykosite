import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Quill from '/imports/ui/components/quill.jsx' 

FlowRouter.route("/", {
  action () {
    mount(AppContainer, {
      content: <Quill/>
    });
  }
});
