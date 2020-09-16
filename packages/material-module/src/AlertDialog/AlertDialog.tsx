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
  ModalProps,
} from '@material-ui/core';

export interface AlertDialogProps {
  handleClose?: () => void;
  isOpen?: boolean;
  title?: ReactNode | string;
  message?: ReactNode | string;
  children?: ReactNode;
  onClose?: ModalProps['onClose'];
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  MuiDialogTitleProps?: DialogTitleProps;
  MuiDialogContentProps?: DialogContentProps;
  MuiDialogContentTextProps?: DialogContentTextProps;
  MuiDialogActionsProps?: DialogActionsProps;
  MuiButtonProps?: ButtonProps;
}

const AlertDialog: FC<AlertDialogProps> = ({
  isOpen = false,
  title,
  message,
  children,
  handleClose,
  onClose,
  onConfirm,
  MuiDialogTitleProps = {},
  MuiDialogContentTextProps = {},
  MuiDialogContentProps = {},
  MuiDialogActionsProps = {},
  MuiButtonProps = {},
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

  const handleConfirmClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (handleClose) {
      handleClose();
    }
    if (onConfirm) {
      onConfirm(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleDialogClose} {...other}>
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
