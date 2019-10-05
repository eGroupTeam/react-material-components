import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

const AlertDialog = ({
  isOpen,
  title,
  message,
  handleClose,
  onConfirm,
  ...other
}) => {
  const handleConfirmClick = e => {
    handleClose();
    if (onConfirm) {
      onConfirm(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleClose()} {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button data-testid="alertDialogConfirm" onClick={handleConfirmClick} color="primary" autoFocus>
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func
};

AlertDialog.defaultProps = {
  isOpen: false,
  title: '',
  message: ''
};

export default AlertDialog;
