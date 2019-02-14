import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

const Theme = ({ theme, children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);

Theme.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Theme;
