import React, { FC, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  SvgIconProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.egPalette.primary[1],
      width: theme.spacing(8),
      height: theme.spacing(8),
      transition: '.3s',
      backgroundColor: theme.palette.common.white,
      border: 0,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: theme.shadows[4],
      outline: 0,

      '&:hover': {
        color: theme.egPalette.primary[0],
        backgroundColor: theme.palette.grey[100],
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
      {icon || <PlayArrowIcon fontSize="large" {...MuiIconProps} />}
    </button>
  );
};

export default withStyles(styles)(YoutubePlayButton);
