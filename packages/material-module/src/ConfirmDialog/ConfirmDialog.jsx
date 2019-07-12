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
        <DialogContentText dangerouslySetInnerHTML={{ __html: message }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelClick} color="primary">
          取消
        </Button>
        <Button onClick={handleConfirmClick} color="primary">
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
  onConfirm: PropTypes.func,
  disableCloseOnConfirm: PropTypes.bool
};

ConfirmDialog.defaultProps = {
  title: '',
  message: ''
};

export default ConfirmDialog;
