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
  isOpen = false,
  title,
  message,
  handleClose,
  onConfirm,
  MuiDialogTitleProps = {},
  MuiDialogContentTextProps = {},
  MuiDialogContentProps = {},
  MuiDialogActionsProps = {},
  MuiButtonProps = {},
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
      <DialogTitle {...MuiDialogTitleProps}>{title}</DialogTitle>
      <DialogContent {...MuiDialogContentProps}>
        <DialogContentText {...MuiDialogContentTextProps}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions {...MuiDialogActionsProps}>
        <Button
          onClick={handleConfirmClick}
          color="primary"
          autoFocus
          {...MuiButtonProps}
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onConfirm: PropTypes.func,
  MuiDialogTitleProps: PropTypes.object,
  MuiDialogContentProps: PropTypes.object,
  MuiDialogContentTextProps: PropTypes.object,
  MuiDialogActionsProps: PropTypes.object,
  MuiButtonProps: PropTypes.object
};

export default AlertDialog;
