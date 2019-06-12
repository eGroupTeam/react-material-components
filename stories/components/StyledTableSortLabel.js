import withStyles from '@material-ui/core/styles/withStyles';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default withStyles(theme => ({
  root: {
    verticalAlign: 'top',
    ...theme.typography.body2,
    color: theme.palette.text.secondary
  }
}))(TableSortLabel);
