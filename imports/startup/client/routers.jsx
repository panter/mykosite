import React from 'react';
import {mount} from 'react-mounter';
import AppContainer from '/imports/ui/layouts/AppContainer.jsx';
import Content from '/imports/ui/components/content.jsx';

FlowRouter.route("/", {
  action () {
    mount(AppContainer, {
      content: <Content name="Dominique" />
    });
  }
});
