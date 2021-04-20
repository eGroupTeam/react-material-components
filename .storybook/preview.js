import React from 'react';

import { addDecorator } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import egTheme from '../packages/material/src/stylesheet/egTheme';
import '../packages/material/src/stylesheet/styles.css';
import './icomoon-styles.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

addDecorator((story) => (
  <ThemeProvider theme={egTheme}>
    <CssBaseline />
    {story()}
  </ThemeProvider>
));