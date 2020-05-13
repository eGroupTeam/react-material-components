import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { NavLink } from 'react-router-dom';
import NestedListItem from '@e-group/material/NestedListItem';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

const NavLinkWrapper = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    width: 240
  }
}));

const NestedSideMenu = props => {
  const {
    className,
    location,
    routes,
    NestedListItemProps,
    NestedListItemItemsProps,
    ...other
  } = props;
  const classes = useStyles(props);
  const {
    MuiListItemProps,
    MuiListItemTextProps,
    ...otherNestedListItemProps
  } = NestedListItemProps || {};
  return (
    <List className={clsx(classes.root, className)} {...other}>
      {routes.map(route => {
        if (route.routes && route.routes.length > 0) {
          let items = route.routes.filter(el => Boolean(el.breadcrumbName));

          // If routes do not exist any breadcrumbName means it doesn't need openable NestedListItem.
          // Therefore we can simply return a `NestedListItem` wrapped by `Link`.
          if (items.length === 0) {
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

          const {
            MuiListItemProps: NestedMuiListItemProps,
            MuiListItemTextProps: NestedMuiListItemTextProps,
            ...otherNestedListItemItemsProps
          } = NestedListItemItemsProps || {};
          let defaultIsOpen = false;
          items = items.map(el => {
            const selected = el.path === location.pathname;
            if (selected) {
              defaultIsOpen = true;
            }
            return {
              icon: el.icon,
              path: el.path,
              MuiListItemProps: {
                button: true,
                selected,
                to: el.path,
                component: NavLinkWrapper,
                ...NestedMuiListItemProps
              },
              MuiListItemTextProps: {
                primary: el.breadcrumbName,
                ...NestedMuiListItemTextProps
              },
              ...otherNestedListItemItemsProps
            };
          });
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
              defaultIsOpen={defaultIsOpen}
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

        if (route.subheader) {
          return <ListSubheader>{route.subheader}</ListSubheader>;
        }

        return null;
      })}
    </List>
  );
};

NestedSideMenu.propTypes = {
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

export default NestedSideMenu;
