import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { matchRoutes } from 'react-router-config';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

import { fetchPostLogout } from 'api';

import styles from './styles';

class NavBar extends Component {
  static propTypes = {
    // react-material props
    classes: PropTypes.object.isRequired,
    // react-router-dom props
    routes: PropTypes.array.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    // parent's control props
    handleDrawerToggle: PropTypes.func.isRequired
  };

  handleLogout = async () => {
    const response = await fetchPostLogout();
    if (response && response.status === 200) this.props.history.replace('/');
  };

  render() {
    const { classes, location, routes, handleDrawerToggle } = this.props;
    const matchedRoutes = matchRoutes(routes, location.pathname);
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerToggle}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>
          <Grid container className={classes.breadcrumb}>
            {matchedRoutes.map((matchRoute, i) => {
              const { path, breadcrumbName } = matchRoute.route;
              // last item
              if (i + 1 === matchedRoutes.length) {
                return (
                  <Grid key={i} item>
                    <Typography variant="h6" color="inherit">
                      {breadcrumbName}
                    </Typography>
                  </Grid>
                );
              }
              return (
                <React.Fragment key={i}>
                  <Grid item>
                    <Typography
                      component={Link}
                      to={path}
                      variant="h6"
                      color="inherit"
                    >
                      {breadcrumbName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <div className={classes.breadcrumbIcon}>
                      <ChevronRightIcon color="inherit" />
                    </div>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
          <Button color="inherit" onClick={this.handleLogout}>
            登出
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(NavBar);
