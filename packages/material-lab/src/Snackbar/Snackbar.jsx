import React from 'react';
import PropTypes from 'prop-types';

import MuiSnackbar from '@material-ui/core/Snackbar';

import SnackbarContent from './SnackbarContent';

const Snackbar = ({
  onClose,
  isOpen,
  message,
  variant,
  SnackbarContentProps,
  ...other
}) => {
  return (
    <MuiSnackbar open={isOpen} onClose={onClose} {...other}>
      <SnackbarContent
        onClose={onClose}
        message={message}
        variant={variant}
        {...SnackbarContentProps}
      />
    </MuiSnackbar>
  );
};

Snackbar.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info']),
  SnackbarContentProps: PropTypes.object
};

Snackbar.defaultProps = {
  isOpen: false
};

export default Snackbar;
