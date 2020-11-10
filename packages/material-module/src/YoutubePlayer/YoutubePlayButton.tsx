import React, { FC, HTMLAttributes, ReactNode } from 'react';
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
      color: '#ffffff',
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
  });

export interface YoutubePlayButtonProps
  extends HTMLAttributes<HTMLButtonElement> {
  /**
   * HTML Attributes
   */
  MuiIconProps?: SvgIconProps;
  /**
   * Customize icon.
   */
  icon?: ReactNode;
}

const YoutubePlayButton: FC<
  YoutubePlayButtonProps & WithStyles<typeof styles>
> = (props) => {
  const { className, classes, MuiIconProps, icon, ...other } = props;
  return (
    <button className={clsx(classes.root, className)} {...other}>
      {icon || <PlayArrowIcon {...MuiIconProps} />}
    </button>
  );
};

export default withStyles(styles)(YoutubePlayButton);
