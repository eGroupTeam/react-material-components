import * as React from 'react';

import clsx from 'clsx';
import { DayProps } from './DateRangePicker.d';

import {
  IconButton,
  Typography,
  createStyles,
  Theme,
  withStyles
} from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    leftBorderRadius: {
      borderRadius: '50% 0 0 50%'
    },
    rightBorderRadius: {
      borderRadius: '0 50% 50% 0'
    },
    buttonContainer: {
      display: 'flex'
    },
    button: {
      height: 36,
      width: 36,
      padding: 0
    },
    buttonText: {
      lineHeight: 1.6
    },
    outlined: {
      border: `1px solid ${theme.palette.primary.dark}`
    },
    filled: {
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      },
      backgroundColor: theme.palette.primary.dark
    },
    highlighted: {
      backgroundColor: theme.palette.action.hover
    },
    contrast: {
      color: theme.palette.primary.contrastText
    },
    invisible: {
      visibility: 'hidden'
    }
  });

const Day: React.FunctionComponent<DayProps> = ({
  classes,
  startOfRange,
  endOfRange,
  disabled,
  highlighted,
  onClick,
  onHover,
  filled,
  value,
  outlined,
  invisible
}) => {
  return (
    <div
      className={clsx(
        classes.buttonContainer,
        startOfRange && classes.leftBorderRadius,
        endOfRange && classes.rightBorderRadius,
        !disabled && highlighted && classes.highlighted,
        invisible && classes.invisible
      )}
    >
      <IconButton
        className={clsx(
          classes.button,
          !disabled && outlined && classes.outlined,
          !disabled && filled && classes.filled
        )}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={onHover}
      >
        <Typography
          color={disabled ? 'textSecondary' : 'textPrimary'}
          className={clsx(
            classes.buttonText,
            !disabled && filled && classes.contrast
          )}
          variant="body2"
        >
          {value}
        </Typography>
      </IconButton>
    </div>
  );
};

export default withStyles(styles)(Day);
