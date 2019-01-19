const styles = theme => ({
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%'
    }
  },
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    textAlign: 'center'
  },
  subTitle: {
    color: theme.palette.grey['A700']
  }
});

export default styles;
