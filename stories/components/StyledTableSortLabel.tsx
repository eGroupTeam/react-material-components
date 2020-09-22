import { createStyles, TableSortLabel, withStyles } from '@material-ui/core';

export default withStyles((theme) =>
  createStyles({
    root: {
      verticalAlign: 'top',
      ...theme.typography.body2,
      color: theme.palette.text.secondary,
    },
  })
)(TableSortLabel);
