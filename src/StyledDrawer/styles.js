const styles = theme => ({
  paper: {
    width: theme.config.drawerWidth,
    [theme.breakpoints.up('md')]: {
      height: '100vh'
    }
  }
});

export default styles;
