import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { NavLink } from 'react-router-dom';
import NestedListItem from '@e-group/material/NestedListItem';
import List from '@material-ui/core/List';

const NavLinkWrapper = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    width: 240
  }
}));

const MobileMenu = ({ className, location, routes, ...other }) => {
  const classes = useStyles();
  return (
    <List className={clsx(classes.root, className)} {...other}>
      {routes.map(route => {
        if (route.routes) {
          const items = route.routes
            ? route.routes
                .filter(el => Boolean(el.breadcrumbName))
                .map(el => ({
                  ...el,
                  MuiListItemProps: {
                    button: true,
                    selected: el.path === location.pathname,
                    to: el.path,
                    component: NavLinkWrapper
                  },
                  MuiListItemTextProps: {
                    primary: el.breadcrumbName
                  }
                }))
            : [];
          return (
            <NestedListItem
              key={route.path}
              icon={route.icon}
              MuiListItemTextProps={{
                primary: route.breadcrumbName
              }}
              items={items}
            />
          );
        }
        if (route.breadcrumbName) {
          return (
            <NestedListItem
              key={route.path}
              icon={route.icon}
              MuiListItemProps={{
                button: true,
                selected: route.path === location.pathname,
                to: route.path,
                component: NavLinkWrapper
              }}
              MuiListItemTextProps={{
                primary: route.breadcrumbName
              }}
            />
          );
        }
        return null;
      })}
    </List>
  );
};

MobileMenu.propTypes = {
  /**
   * react router config routes.
   */
  routes: PropTypes.array.isRequired,
  /**
   * react router location
   */
  location: PropTypes.object.isRequired,
  /**
   * JSX Attribute.
   */
  className: PropTypes.string
};

export default MobileMenu;
