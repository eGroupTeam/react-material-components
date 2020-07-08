import React from 'react';

import clsx from 'clsx';
import { DayProps } from './DateRangePicker.d';

import {
  IconButton,
  Typography,
  createStyles,
  Theme,
  withStyles
} from '@material-ui/core';

const startBorderStyle = {
  borderRadius: '50% 0 0 50%'
};
const endBorderStyle = {
  borderRadius: '0 50% 50% 0'
};
export const styles = (theme: Theme) =>
  createStyles({
    inRange: {
      backgroundColor: theme.palette.primary.light,
      '&:first-child': startBorderStyle,
      '&:last-child': endBorderStyle
    },
    startBorder: startBorderStyle,
    endBorder: endBorderStyle,
    buttonContainer: {
      display: 'flex',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderColor: 'transparent'
    },
    button: {
      height: 36,
      width: 36,
      transform: 'scale(1.1)'
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
    hovered: {
      borderTopColor: theme.palette.action.focus,
      borderBottomColor: theme.palette.action.focus,
      '&:first-child': {
        ...startBorderStyle,
        borderLeftColor: theme.palette.action.focus
      },
      '&:last-child': {
        ...endBorderStyle,
        borderRightColor: theme.palette.action.focus
      }
    },
    hoveredStart: {
      ...startBorderStyle,
      borderLeftColor: theme.palette.action.focus
    },
    hoveredEnd: {
      ...endBorderStyle,
      borderRightColor: theme.palette.action.focus
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
  startOfDateRange,
  endOfDateRange,
  disabled,
  inDateRange,
  onClick,
  onHover,
  filled,
  inHoveredRange,
  value,
  outlined,
  invisible,
  endOfHoveredRange,
  startOfHoveredRange
}) => {
  const enable = !disabled && !invisible;
  return (
    <div
      className={clsx(
        classes.buttonContainer,
        invisible && classes.invisible,
        startOfDateRange && classes.startBorder,
        endOfDateRange && classes.endBorder,
        enable && inDateRange && classes.inRange,
        enable && inHoveredRange && classes.hovered,
        enable && inHoveredRange && endOfHoveredRange && classes.hoveredEnd,
        enable && inHoveredRange && startOfHoveredRange && classes.hoveredStart
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
