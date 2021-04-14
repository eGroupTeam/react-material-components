import React from 'react';

import { addDecorator } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import muiTheme from '../packages/material/src/stylesheet/muiTheme';
import '../packages/material/src/stylesheet/app.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator((story) => (
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    {story()}
  </ThemeProvider>
));