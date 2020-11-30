import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import {
  Box,
  Button,
  ButtonProps,
  ClickAwayListener,
  ClickAwayListenerProps,
  createStyles,
  IconButton,
  IconButtonProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditableFieldActions from '../EditableFieldActions';

export const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      marginLeft: theme.spacing(1),
    },
  });

export interface EditableFieldEditingProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Props applied to the Mui `Button` element.
   */
  MuiButtonProps?: ButtonProps;
  /**
   * Props applied to the Mui `IconButton` element.
   */
  MuiIconButtonProps?: IconButtonProps;
  /**
   * The content of the EditableField actions.
   */
  actions?: ReactNode;
  /**
   * Handle click away.
   */
  onClickAway: ClickAwayListenerProps['onClickAway'];
  /**
   * Handle save button click.
   */
  onSaveClick?: ButtonProps['onClick'];
  /**
   * Handle close button click.
   */
  onCloseClick?: IconButtonProps['onClick'];
}

const EditableFieldEditing = forwardRef<
  HTMLDivElement,
  EditableFieldEditingProps & WithStyles<typeof styles>
>(function EditableFieldEditing(props, ref) {
  const {
    children,
    classes,
    onClickAway,
    onSaveClick,
    onCloseClick,
    MuiButtonProps,
    MuiIconButtonProps,
    actions,
    ...other
  } = props;

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div ref={ref} {...other}>
        {children}
        <EditableFieldActions>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={onSaveClick}
            {...MuiButtonProps}
          >
            儲存
          </Button>
          <IconButton
            size="small"
            className={classes.closeButton}
            onClick={onCloseClick}
            {...MuiIconButtonProps}
          >
            <CloseIcon />
          </IconButton>
          <Box flexGrow={1} />
          {actions}
        </EditableFieldActions>
      </div>
    </ClickAwayListener>
  );
});

export default withStyles(styles)(EditableFieldEditing);
