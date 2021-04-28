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
  ClickAwayListener,
  ClickAwayListenerProps,
} from '@material-ui/core';
import useControlled from '@e-group/hooks/useControlled';

import EditableFieldEditing, {
  EditableFieldEditingProps,
} from '../EditableFieldEditing';

const styles = (theme: Theme) =>
  createStyles({
    fieldEditing: {
      padding: theme.spacing(1),
    },
    pointer: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    hide: {
      display: 'none',
    },
  });

export type SaveOptions = {
  openEditing: () => void;
  closeEditing: () => void;
};

export interface EditableFieldProps extends HTMLAttributes<HTMLDivElement> {
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
   * How to implementation hide.
   */
  implementation?: 'css' | 'js';
  /**
   * @ignore
   */
  onClickAway?: ClickAwayListenerProps['onClickAway'];
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
  EditableFieldProps & WithStyles<typeof styles>
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
    implementation = 'css',
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
    if (!isEditing) return;
    if (!disableClickAwayCloseEditing) {
      closeEditing();
    }
    if (onClickAway) {
      onClickAway(e);
    }
  };

  const renderContent = () => {
    if (implementation === 'js') {
      return (
        <>
          {isEditing ? (
            <ClickAwayListener onClickAway={handleClickAway}>
              <EditableFieldEditing
                className={classes.fieldEditing}
                onSaveClick={handleSaveClick}
                onCloseClick={handleCloseClick}
                MuiButtonProps={MuiButtonProps}
                MuiIconButtonProps={MuiIconButtonProps}
                actions={actions}
              >
                {editing}
              </EditableFieldEditing>
            </ClickAwayListener>
          ) : (
            <div>{showing}</div>
          )}
        </>
      );
    }
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <EditableFieldEditing
            className={clsx(classes.fieldEditing, !isEditing && classes.hide)}
            onSaveClick={handleSaveClick}
            onCloseClick={handleCloseClick}
            MuiButtonProps={MuiButtonProps}
            MuiIconButtonProps={MuiIconButtonProps}
            actions={actions}
          >
            {editing}
          </EditableFieldEditing>
          <div className={clsx(isEditing && classes.hide)}>{showing}</div>
        </div>
      </ClickAwayListener>
    );
  };

  return (
    <div
      ref={ref}
      className={clsx(className, {
        [classes.pointer]: !isEditing,
      })}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
      {...other}
    >
      {renderContent()}
    </div>
  );
});

export default withStyles(styles, { name: 'EgEditableField' })(EditableField);
