import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import useControlled from '@e-group/hooks/useControlled';

import EditableFieldEditing from '../EditableFieldEditing';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  editing: {
    padding: theme.spacing(1),
  },
  showing: {
    cursor: 'pointer',
  },
});

const EditableField = React.forwardRef(function EditableField(props, ref) {
  const {
    children: childrenProp,
    classes,
    className,
    MuiButtonProps,
    MuiIconButtonProps,
    onClickAway,
    onClick,
    onSaveClick,
    onCloseClick,
    isEditing: isEditingProp,
    defaultIsEditing,
    disableClickAwayCloseEditing,
    actions,
    ...other
  } = props;
  const [isEditing, setIsEditing] = useControlled({
    controlled: isEditingProp,
    default: Boolean(defaultIsEditing),
  });

  const [showing, ...editing] = React.Children.toArray(childrenProp);

  const openEditing = React.useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);
  const closeEditing = React.useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const handleClick = (e) => {
    openEditing();
    if (onClick) {
      onClick(e);
    }
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (onSaveClick) {
      onSaveClick(e, {
        openEditing,
        closeEditing,
      });
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    closeEditing();
    if (onCloseClick) {
      onCloseClick(e);
    }
  };

  const handleClickAway = (e) => {
    if (!disableClickAwayCloseEditing) {
      closeEditing();
    }
    if (onClickAway) {
      onClickAway(e);
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(classes.root, className, {
        [classes.showing]: !isEditing,
      })}
      onClick={handleClick}
      {...other}
    >
      {isEditing ? (
        <EditableFieldEditing
          className={classes.editing}
          onClickAway={handleClickAway}
          onSaveClick={handleSaveClick}
          onCloseClick={handleCloseClick}
          MuiButtonProps={MuiButtonProps}
          MuiIconButtonProps={MuiIconButtonProps}
          actions={actions}
        >
          {editing}
        </EditableFieldEditing>
      ) : (
        showing
      )}
    </div>
  );
});

EditableField.propTypes = {
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
   * @ignore
   */
  className: PropTypes.string,
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
   * Set default isEditing.
   */
  defaultIsEditing: PropTypes.bool,
  /**
   * If `true`, the click away close editing will disable.
   */
  disableClickAwayCloseEditing: PropTypes.bool,
  /**
   * @ignore
   */
  onClickAway: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onSaveClick: PropTypes.func,
  /**
   * @ignore
   */
  onCloseClick: PropTypes.func,
};

EditableField.defaultProps = {
  defaultIsEditing: false,
};

export default withStyles(styles)(EditableField);
