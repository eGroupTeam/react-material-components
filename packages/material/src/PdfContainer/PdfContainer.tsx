import React, { forwardRef, HTMLAttributes } from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import clsx from 'clsx';

export interface PdfContainerProps extends HTMLAttributes<HTMLDivElement> {
  pageSize?: 'A4';
}

const styles = () =>
  createStyles({
    root: {
      width: ({ pageSize = 'A4' }: PdfContainerProps) => {
        switch (pageSize) {
          case 'A4':
          default:
            return 980;
        }
      },
      margin: 'auto',
    },
  });

const PdfContainer = forwardRef<
  HTMLDivElement,
  PdfContainerProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, pageSize, ...other } = props;

  return <div ref={ref} className={clsx(className, classes.root)} {...other} />;
});

export default withStyles(styles)(PdfContainer);
