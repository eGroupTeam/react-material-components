import React, { FC, MouseEventHandler, ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ButtonProps,
  DialogActionsProps,
  DialogContentProps,
  DialogTitleProps,
  DialogContentTextProps,
  ModalProps,
  DialogProps,
} from '@material-ui/core';

export interface ConfirmDialogProps extends DialogProps {
  handleClose?: () => void;
  isOpen?: boolean;
  primary?: ReactNode | string;
  message?: ReactNode | string;
  children?: ReactNode;
  onClose?: ModalProps['onClose'];
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  disableCloseOnConfirm?: boolean;
  MuiDialogTitleProps?: DialogTitleProps;
  MuiDialogContentProps?: DialogContentProps;
  MuiDialogContentTextProps?: DialogContentTextProps;
  MuiDialogActionsProps?: DialogActionsProps;
  MuiCancelButtonProps?: ButtonProps;
  MuiConfirmButtonProps?: ButtonProps;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen = false,
  primary,
  message,
  children,
  handleClose,
  onClose,
  onCancel,
  onConfirm,
  open,
  disableCloseOnConfirm,
  MuiDialogTitleProps = {},
  MuiDialogContentTextProps = {},
  MuiDialogContentProps = {},
  MuiDialogActionsProps = {},
  MuiCancelButtonProps = {},
  MuiConfirmButtonProps = {},
  ...other
}) => {
  const handleDialogClose: ModalProps['onClose'] = (e, reason) => {
    if (handleClose) {
      handleClose();
    }
    if (onClose) {
      onClose(e, reason);
    }
  };

  const handleCancelClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (handleClose) {
      handleClose();
    }
    if (onCancel) {
      onCancel(e);
    }
  };

  const handleConfirmClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!disableCloseOnConfirm && handleClose) {
      handleClose();
    }
    if (onConfirm) {
      onConfirm(e);
    }
  };

  return (
    <Dialog open={open ?? isOpen} onClose={handleDialogClose} {...other}>
      <DialogTitle {...MuiDialogTitleProps}>{primary}</DialogTitle>
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

export default ConfirmDialog;
