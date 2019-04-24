import { withStyles } from '@material-ui/core';
import { TableSortLabel } from '@material-ui/core';

export default withStyles(theme => ({
  root: {
    verticalAlign: 'top',
    ...theme.typography.body2,
    color: theme.palette.text.secondary
  }
}))(TableSortLabel);
