import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    position: 'relative'
  },
  fullWidth: {
    width: '100%'
  },
  success: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  progress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
});

export default styles;
