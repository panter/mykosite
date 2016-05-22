import React from 'react';
import {mount} from 'react-mounter';
import {MainLayout} from '/imports/ui/layouts/mainLayout.jsx';
import Content from '/imports/ui/components/content.jsx';

FlowRouter.route("/", {
  action () {
    mount(MainLayout, {
      content: <Content name="Dominique" />
    });
  }
});
