import React, { FC, HTMLAttributes } from 'react';
import {
  createStyles,
  SvgIconProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import clsx from 'clsx';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      transition: '.3s',
      backgroundColor: theme.palette.secondary.light,
      border: 0,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: theme.shadows[4],
      outline: 0,

      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    icon: {
      color: '#ffffff',
    },
  });

export interface YoutubePlayButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  /**
   * HTML Attributes
   */
  MuiIconProps?: SvgIconProps;
}

const YoutubePlayButton: FC<
  YoutubePlayButtonProps & WithStyles<typeof styles>
> = ({ className, classes, MuiIconProps, ...other }) => {
  const { className: iconClassName, ...otherMuiIconProps } = MuiIconProps || {};
  return (
    <button className={clsx(classes.root, className)} {...other}>
      <PlayArrowIcon
        className={clsx(classes.icon, iconClassName)}
        {...otherMuiIconProps}
      />
    </button>
  );
};

export default withStyles(styles)(YoutubePlayButton);
