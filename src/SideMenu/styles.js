const styles = theme => ({
  header: {
    height: '53px',
    [theme.breakpoints.up('md')]: {
      height: theme.config.navbarHeight
    },
    paddingLeft: '16px'
  },
  // react material not support active ListItem so refer to this issue
  // this only work with react-router-dom's NavLink component
  // https://github.com/mui-org/material-ui/issues/1534
  itemActive: {
    backgroundColor: theme.palette.action.selected
  }
});

export default styles;
