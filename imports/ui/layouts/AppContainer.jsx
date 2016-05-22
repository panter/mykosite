import theme from "./theme.jsx";
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {AppBar, Styles, RaisedButton, DatePicker} from 'material-ui';

export default ({header, content, footer}) => {

  return (
    <MuiThemeProvider muiTheme={theme}>
      <div>
         <AppBar title="00000" className="app-bar"/> 
        {content}
      </div>
    </MuiThemeProvider>
  );
}
