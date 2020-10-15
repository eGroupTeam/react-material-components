import React, { FC, ReactNode } from 'react';

import calcPaddingTop from '@e-group/utils/calcPaddingTop';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = () =>
  createStyles({
    root: {
      position: 'relative',
      display: 'block',
      width: '100%',
      overflow: 'hidden',

      '&::before': {
        display: 'block',
        content: "''",
        zIndex: 0,
        paddingTop: (props: ResponsiveEmbedProps) =>
          calcPaddingTop(props.ratio || '16:9'),
      },
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      border: 0,
    },
  });

export interface ResponsiveEmbedProps {
  /**
   * HTML Attributes
   */
  className?: string;
  /**
   * Image ratio
   */
  ratio: string;
  /**
   * The content
   */
  children: ReactNode;
}

const ResponsiveEmbed: FC<ResponsiveEmbedProps & WithStyles<typeof styles>> = (
  props
) => {
  const { className, classes, children, ...other } = props;
  return (
    <div className={clsx(className, classes.root)} {...other}>
      <div className={classes.iframe}>{children}</div>
    </div>
  );
};

export default withStyles(styles)(ResponsiveEmbed);
