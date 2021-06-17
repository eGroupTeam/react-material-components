import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Theme, withStyles, createStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(),
    },
  });

export type PdfHeaderProps = HTMLAttributes<HTMLDivElement>;

const PdfFooter = forwardRef<
  HTMLDivElement,
  PdfHeaderProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, children, ...other } = props;

  return (
    <div ref={ref} className={clsx(className, classes.root)} {...other}>
      {children}
    </div>
  );
});

export default withStyles(styles)(PdfFooter);
