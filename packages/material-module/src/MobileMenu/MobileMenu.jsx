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

const MobileMenu = ({
  className,
  location,
  routes,
  NestedListItemProps,
  NestedListItemItemsProps,
  ...other
}) => {
  const classes = useStyles();
  const {
    MuiListItemProps,
    MuiListItemTextProps,
    ...otherNestedListItemProps
  } = NestedListItemProps || {};
  return (
    <List className={clsx(classes.root, className)} {...other}>
      {routes.map(route => {
        if (route.routes) {
          const {
            MuiListItemProps,
            MuiListItemTextProps,
            ...otherNestedListItemProps
          } = NestedListItemItemsProps || {};
          const items = route.routes
            ? route.routes
                .filter(el => Boolean(el.breadcrumbName))
                .map(el => ({
                  icon: el.icon,
                  path: el.path,
                  MuiListItemProps: {
                    button: true,
                    selected: el.path === location.pathname,
                    to: el.path,
                    component: NavLinkWrapper,
                    ...MuiListItemProps
                  },
                  MuiListItemTextProps: {
                    primary: el.breadcrumbName,
                    ...MuiListItemTextProps
                  },
                  ...otherNestedListItemProps
                }))
            : [];
          return (
            <NestedListItem
              key={route.path}
              icon={route.icon}
              MuiListItemProps={{
                button: true,
                ...MuiListItemProps
              }}
              MuiListItemTextProps={{
                primary: route.breadcrumbName,
                ...MuiListItemTextProps
              }}
              items={items}
              {...otherNestedListItemProps}
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
                component: NavLinkWrapper,
                ...MuiListItemProps
              }}
              MuiListItemTextProps={{
                primary: route.breadcrumbName,
                ...MuiListItemTextProps
              }}
              {...otherNestedListItemProps}
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
  className: PropTypes.string,
  /**
   * `NestedListItem` props.
   */
  NestedListItemProps: PropTypes.object,
  /**
   * `NestedListItem` items props.
   */
  NestedListItemItemsProps: PropTypes.object
};

export default MobileMenu;
