import theme from "./theme.jsx";
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {AppBar, Styles, RaisedButton, DatePicker, Snackbar} from 'material-ui';

export default ({header, content, footer}) => {

  return (
    <MuiThemeProvider muiTheme={theme}>
      <div>
          <AppBar iconClassNameLeft='' title="Mykosite" className="app-bar"/>
        {content}
      </div>
    </MuiThemeProvider>
  );
}
