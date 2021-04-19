import React, {
  Children,
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  useCallback,
  MouseEvent,
} from 'react';

import clsx from 'clsx';
import {
  withStyles,
  WithStyles,
  ButtonProps,
  IconButtonProps,
  Theme,
  createStyles,
} from '@material-ui/core';
import useControlled from '@e-group/hooks/useControlled';

import EditableFieldEditing, {
  EditableFieldEditingProps,
} from '../EditableFieldEditing';

const styles = (theme: Theme) =>
  createStyles({
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

export type SaveOptions = {
  openEditing: () => void;
  closeEditing: () => void;
};

export interface EditableProps extends HTMLAttributes<HTMLDivElement> {
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
   * Set default isEditing.
   */
  defaultIsEditing?: boolean;
  /**
   * Controll isEditing.
   */
  isEditing?: boolean;
  /**
   * If `true`, the click away close editing will disable.
   */
  disableClickAwayCloseEditing?: boolean;
  /**
   * @ignore
   */
  onClickAway?: EditableFieldEditingProps['onClickAway'];
  /**
   * @ignore
   */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /**
   * @ignore
   */
  onSaveClick?: (
    event: MouseEvent<HTMLButtonElement, MouseEvent>,
    option: SaveOptions
  ) => void;
  /**
   * @ignore
   */
  onCloseClick?: EditableFieldEditingProps['onCloseClick'];
}

const EditableField = forwardRef<
  HTMLDivElement,
  EditableProps & WithStyles<typeof styles>
>(function EditableField(props, ref) {
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
    defaultIsEditing = false,
    disableClickAwayCloseEditing,
    actions,
    ...other
  } = props;
  const [isEditing, setIsEditing] = useControlled({
    controlled: isEditingProp,
    default: Boolean(defaultIsEditing),
  });

  const [showing, ...editing] = Children.toArray(childrenProp);

  const openEditing = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);
  const closeEditing = useCallback(() => {
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
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
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

export default withStyles(styles)(EditableField);
