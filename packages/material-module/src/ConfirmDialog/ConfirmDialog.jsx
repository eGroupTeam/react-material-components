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
  children,
  handleClose,
  onCancel,
  onConfirm,
  disableCloseOnConfirm,
  MuiDialogTitleProps = {},
  MuiDialogContentTextProps = {},
  MuiDialogContentProps = {},
  MuiDialogActionsProps = {},
  MuiCancelButtonProps = {},
  MuiConfirmButtonProps = {},
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
      <DialogTitle {...MuiDialogTitleProps}>{title}</DialogTitle>
      <DialogContent {...MuiDialogContentProps}>
        {message && (
          <DialogContentText {...MuiDialogContentTextProps}>
            {message}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions {...MuiDialogActionsProps}>
        <Button
          onClick={handleCancelClick}
          color="primary"
          {...MuiCancelButtonProps}
        >
          取消
        </Button>
        <Button
          onClick={handleConfirmClick}
          color="primary"
          {...MuiConfirmButtonProps}
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
  children: PropTypes.node,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  disableCloseOnConfirm: PropTypes.bool,
  MuiDialogTitleProps: PropTypes.object,
  MuiDialogContentProps: PropTypes.object,
  MuiDialogContentTextProps: PropTypes.object,
  MuiDialogActionsProps: PropTypes.object,
  MuiCancelButtonProps: PropTypes.object,
  MuiConfirmButtonProps: PropTypes.object
};

export default ConfirmDialog;
