const styles = theme => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: 0,

    '& button': {
      margin: `0 ${theme.spacing(0.5)}px`
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
