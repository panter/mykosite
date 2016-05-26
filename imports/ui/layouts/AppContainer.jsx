import theme from "./theme.jsx";
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {TextField} from 'material-ui';
import Page from '/imports/ui/containers/page.js';
import {AppBar, FlatButton} from 'material-ui';
import Links from '/imports/ui/containers/links.js'

const changeName = _.debounce((name) => {
  FlowRouter.setQueryParams({ page: name ? name : null });
}, 200);

const getName = () => {
  return FlowRouter.getQueryParam('page');
}

export default ({header, content, footer}) => {
  return (
    <MuiThemeProvider muiTheme={theme}>
      <div>
        <AppBar iconClassNameLeft='' className="app-bar"
                title="Mykosite" titleStyle={{flex: '0 0 auto', marginRight: '16px'}}>
          <TextField name="page-name" className="page-name" hintText="Page"
                     style={{fontSize:'24px', height:'56px'}}
                     inputStyle={{padding: '4px 0px', color: 'white'}}
                     underlineStyle={{borderColor: 'white'}}
                     underlineFocusStyle={{borderColor: 'white'}}
                     defaultValue={getName()}
                     onChange={(e) => changeName(e.target.value)}
          />
        </AppBar>
        <Page />
        <Links />
        {content}
      </div>
    </MuiThemeProvider>
  );
}
