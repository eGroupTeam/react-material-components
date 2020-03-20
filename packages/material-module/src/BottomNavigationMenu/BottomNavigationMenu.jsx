import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const NavLinkWrapper = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    bottom: '0',
    left: '0',
    position: 'fixed'
  }
}));

const BottomNavigationMenu = props => {
  const { location, routes } = props;
  const classes = useStyles(props);
  const [tabValue, setTabValue] = React.useState(location.pathname);

  React.useEffect(() => {
    const rootPath = location.pathname.split('/')[1];
    setTabValue(`/${rootPath}`);
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <BottomNavigation value={tabValue}>
        {routes.map(route => {
          if (route.breadcrumbName) {
            return (
              <BottomNavigationAction
                key={route.path}
                label={route.breadcrumbName}
                value={route.path}
                icon={route.icon}
                component={NavLinkWrapper}
                exact={route.exact}
                to={route.path}
              />
            );
          }
          return null;
        })}
      </BottomNavigation>
    </div>
  );
};

BottomNavigationMenu.propTypes = {
  /**
   * react router props
   */
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
};

export default BottomNavigationMenu;
