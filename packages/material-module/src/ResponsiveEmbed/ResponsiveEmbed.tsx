import React, { ReactNode } from 'react';

import calcPaddingTop from '@e-group/utils/calcPaddingTop';
import { createStyles, withStyles } from '@material-ui/core';

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
   * Image ratio
   */
  ratio: string;
  /**
   * The content
   */
  children: ReactNode;
}

const ResponsiveEmbed = (props) => {
  const { classes, children } = props;
  return (
    <div className={classes.root}>
      <div className={classes.iframe}>{children}</div>
    </div>
  );
};

export default withStyles(styles)(ResponsiveEmbed);
