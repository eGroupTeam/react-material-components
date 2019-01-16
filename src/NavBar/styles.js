const styles = theme => ({
  appBar: {
    position: 'fixed',
    left: 0,
    top: 0,
    [theme.breakpoints.up('md')]: {
      left: theme.config.drawerWidth,
      width: `calc(100% - ${theme.config.drawerWidth}px)`
    }
  },
  breadcrumb: {
    flexGrow: 1
  },
  breadcrumbIcon: {
    marginTop: '0.1em'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

export default styles;
