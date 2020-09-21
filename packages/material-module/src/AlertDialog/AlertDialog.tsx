import React, { FC, ReactNode, MouseEventHandler } from 'react';
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
  DialogContentTextProps,
  DialogTitleProps,
  DialogProps,
} from '@material-ui/core';

export interface AlertDialogProps extends Omit<DialogProps, 'open'> {
  handleClose?: () => void;
  isOpen?: boolean;
  open?: DialogProps['open'];
  primary?: ReactNode | string;
  message?: ReactNode | string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  MuiDialogTitleProps?: DialogTitleProps;
  MuiDialogContentProps?: DialogContentProps;
  MuiDialogContentTextProps?: DialogContentTextProps;
  MuiDialogActionsProps?: DialogActionsProps;
  MuiButtonProps?: ButtonProps;
}

const AlertDialog: FC<AlertDialogProps> = ({
  isOpen = false,
  primary,
  message,
  children,
  handleClose,
  onClose,
  onConfirm,
  open,
  MuiDialogTitleProps = {},
  MuiDialogContentTextProps = {},
  MuiDialogContentProps = {},
  MuiDialogActionsProps = {},
  MuiButtonProps = {},
  ...other
}) => {
  const handleDialogClose: DialogProps['onClose'] = (e, reason) => {
    if (handleClose) {
      handleClose();
    }
    if (onClose) {
      onClose(e, reason);
    }
  };

  const handleConfirmClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (handleClose) {
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

export default AlertDialog;
