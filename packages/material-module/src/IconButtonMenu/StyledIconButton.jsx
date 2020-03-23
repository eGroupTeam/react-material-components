import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

export default withStyles(theme => ({
  root: {
    width: theme.spacing(9.5),
    height: theme.spacing(9.5)
  },
  label: {
    flexDirection: 'column'
  }
}))(IconButton);
