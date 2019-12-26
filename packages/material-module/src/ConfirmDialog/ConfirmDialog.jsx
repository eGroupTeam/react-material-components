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

const ConfirmDialog = ({
  isOpen = false,
  title,
  message,
  handleClose,
  onCancel,
  onConfirm,
  disableCloseOnConfirm,
  ...other
}) => {
  const handleCancelClick = e => {
    handleClose();
    if (onCancel) {
      onCancel(e);
    }
  };

  const handleConfirmClick = e => {
    if (!disableCloseOnConfirm) {
      handleClose();
    }
    if (onConfirm) {
      onConfirm(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid="confirmDialogCancel"
          onClick={handleCancelClick}
          color="primary"
        >
          取消
        </Button>
        <Button
          data-testid="confirmDialogConfirm"
          onClick={handleConfirmClick}
          color="primary"
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  disableCloseOnConfirm: PropTypes.bool
};

export default ConfirmDialog;
