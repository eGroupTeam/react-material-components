import React from 'react';
import PropTypes from 'prop-types';

import MuiSnackbar from '@material-ui/core/Snackbar';

import SnackbarContent from './SnackbarContent';

const Snackbar = ({
  handleClose,
  isOpen,
  message,
  variant,
  SnackbarContentProps,
  ...other
}) => {
  return (
    <MuiSnackbar open={isOpen} onClose={handleClose} {...other}>
      <SnackbarContent
        onClose={handleClose}
        message={message}
        variant={variant}
        {...SnackbarContentProps}
      />
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default Snackbar;
