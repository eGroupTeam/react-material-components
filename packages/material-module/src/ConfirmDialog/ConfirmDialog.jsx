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
  open,
  title,
  message,
  handleClose,
  onCancel,
  onConfirm
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          取消
        </Button>
        <Button onClick={onConfirm} color="primary">
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

export default ConfirmDialog;
