import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const NavLinkWrapper = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: '0',
    left: '0',
    position: 'fixed',
    zIndex: theme.zIndex.appBar,
  },
}));

const BottomNavigationMenu = (props) => {
  const { location, routes, rootPath } = props;
  const classes = useStyles(props);
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    const firstPath = location.pathname.split('/')[2];
    if (firstPath) {
      setValue(`${rootPath}/${firstPath}`);
    } else {
      setValue(rootPath);
    }
  }, [location.pathname, rootPath]);

  return (
    <div className={classes.root}>
      <BottomNavigation value={value}>
        {routes.map((route) => {
          if (route.breadcrumbName) {
            return (
              <BottomNavigationAction
                key={route.key}
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
  routes: PropTypes.array.isRequired,
  /**
   * react router props
   */
  location: PropTypes.object.isRequired,
  /**
   * Set root path to identify and set correct value.
   */
  rootPath: PropTypes.string,
};

BottomNavigationMenu.defaultProps = {
  rootPath: '/',
};

export default BottomNavigationMenu;
