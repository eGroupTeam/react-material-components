import React, { forwardRef, HTMLAttributes } from 'react';

import clsx from 'clsx';
import { withStyles, Theme, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
});

export type EditableFieldActionsProps = HTMLAttributes<HTMLDivElement>;

const EditableFieldActions = forwardRef<
  HTMLDivElement,
  EditableFieldActionsProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, ...other } = props;

  return <div ref={ref} className={clsx(classes.root, className)} {...other} />;
});

export default withStyles(styles)(EditableFieldActions);
