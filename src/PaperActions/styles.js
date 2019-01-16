const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 3}px`,
    paddingTop: 0,

    '& button': {
      margin: `0 ${theme.spacing.unit * 0.5}px`
    }
  },
  right: {
    textAlign: 'right'
  },
  left: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  }
});

export default styles;
