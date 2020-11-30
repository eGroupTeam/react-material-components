import React, { forwardRef, HTMLAttributes } from 'react';

import clsx from 'clsx';
import { withStyles, Theme, WithStyles } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
});

const EditableFieldActions = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & WithStyles<typeof styles>
>(function EditableFieldActions(props, ref) {
  const { className, classes, ...other } = props;

  return <div ref={ref} className={clsx(classes.root, className)} {...other} />;
});

export default withStyles(styles)(EditableFieldActions);
