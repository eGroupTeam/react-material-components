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
  isOpen,
  title,
  message,
  handleClose,
  onCancel,
  onConfirm
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText dangerouslySetInnerHTML={{ __html: message }} />
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
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

export default ConfirmDialog;
