import styled from '@material-ui/core/styles/styled';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default styled(TableSortLabel)(({ theme }) => ({
  root: {
    verticalAlign: 'top',
    ...theme.typography.body2,
    color: theme.palette.text.secondary
  }
}));
