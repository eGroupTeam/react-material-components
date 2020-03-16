import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import EditableFieldActions from '../EditableFieldActions';

export const styles = theme => ({
  closeButton: {
    marginLeft: theme.spacing(1)
  }
});

const EditableFieldEditing = React.forwardRef(function EditableFieldEditing(
  props,
  ref
) {
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

EditableFieldEditing.propTypes = {
  /**
   * The content of the EditableField.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Props applied to the Mui `Button` element.
   */
  MuiButtonProps: PropTypes.object,
  /**
   * Props applied to the Mui `IconButton` element.
   */
  MuiIconButtonProps: PropTypes.object,
  /**
   * The content of the EditableField actions.
   */
  actions: PropTypes.node,
  /**
   * @ignore
   */
  onClickAway: PropTypes.func,
  /**
   * @ignore
   */
  onSaveClick: PropTypes.func,
  /**
   * @ignore
   */
  onCloseClick: PropTypes.func
};

export default withStyles(styles)(EditableFieldEditing);
