import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const Theme = ({ theme, children, ...other }) => {
  if (process.env.NODE_ENV !== 'production') console.log(theme);
  return (
    <ThemeProvider theme={theme} {...other}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  theme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default Theme;
