const styles = theme => ({
  root: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '960px'
    },
    margin: 'auto'
  }
});

export default styles;
