import React, { forwardRef, HTMLAttributes } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = () =>
  createStyles({
    root: {
      position: 'absolute',
      left: -16384,
    },
  });

export interface PdfPrintBoxProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /**
   * Print Box id is necessary
   */
  id: string;
}

const PdfPrintBox = forwardRef<
  HTMLDivElement,
  PdfPrintBoxProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, ...other } = props;

  return <div ref={ref} className={clsx(className, classes.root)} {...other} />;
});

export default withStyles(styles)(PdfPrintBox);
