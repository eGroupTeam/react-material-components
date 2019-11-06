import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import StyledIconButton from './StyledIconButton';

const NavLinkWrapper = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    bottom: '0',
    left: '0',
    position: 'fixed',
    top: '64px',
    [theme.breakpoints.down('sm')]: {
      top: 'auto',
      right: 0,
      zIndex: theme.zIndex.appBar
    }
  },
  container: {
    padding: `${theme.spacing(3)}px 0`
  },
  // react material not support active ListItem so refer to this issue
  // this only work with react-router-dom's NavLink component
  // https://github.com/mui-org/material-ui/issues/1534
  itemActive: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const SideMenu = ({ location, routes }) => {
  const [tabValue, setTabValue] = React.useState(location.pathname);
  const classes = useStyles();

  React.useEffect(() => {
    const rootPath = location.pathname.split('/')[1];
    setTabValue(`/${rootPath}`);
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <Grid className={classes.container} container direction="column">
          {routes.map(route => {
            if (route.breadcrumbName) {
              return (
                <Grid item key={route.path}>
                  <StyledIconButton
                    component={NavLinkWrapper}
                    exact={route.exact}
                    to={route.path}
                    activeClassName={classes.itemActive}
                  >
                    {route.icon}
                    <Typography variant="caption">
                      {route.breadcrumbName}
                    </Typography>
                  </StyledIconButton>
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </Hidden>
      <Hidden mdUp>
        {/* TODO: Change implement with new component BottomNavigation */}
        <Paper square>
          <Tabs
            value={tabValue}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
          >
            {routes.map(route => {
              if (route.breadcrumbName) {
                return (
                  <Tab
                    component={NavLinkWrapper}
                    key={route.path}
                    icon={route.icon}
                    label={route.breadcrumbName}
                    exact={route.exact}
                    value={route.path}
                    to={route.path}
                  />
                );
              }
              return null;
            })}
          </Tabs>
        </Paper>
      </Hidden>
    </div>
  );
};

SideMenu.propTypes = {
  location: PropTypes.array.isRequired,
  routes: PropTypes.array.isRequired
};

export default SideMenu;
