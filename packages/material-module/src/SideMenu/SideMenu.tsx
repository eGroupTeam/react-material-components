import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';
import ListItemNavLink from '@e-group/material/ListItemNavLink';
import {
  makeStyles,
  List,
  ListProps,
  ListItemProps,
  ListSubheader,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: theme.spacing(32),
  },
}));

export type Route = {
  path?: string;
  exact?: boolean;
  breadcrumbName?: string;
  subheader?: string;
  icon?: ReactNode;
  MuiListItemProps?: ListItemProps;
};

export interface SideMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * react router props
   */
  routes: Route[];
  /**
   * pathname
   */
  pathname: string;
  /**
   * Mui `List` props.
   */
  MuiListProps?: ListProps;
  /**
   * Mui `ListItem` props.
   */
  MuiListItemProps?: ListItemProps;
}

const SideMenu = forwardRef<HTMLDivElement, SideMenuProps>((
  props,
  ref
) => {
  const {
    className,
    routes,
    pathname,
    MuiListProps,
    MuiListItemProps: ShareMuiListItemProps,
    ...other
  } = props;
  const classes = useStyles(props);

  return (
    <div ref={ref} className={clsx(classes.root, className)} {...other}>
      <List {...MuiListProps}>
        {routes.map((route) => {
          const {
            breadcrumbName,
            path,
            exact,
            icon,
            subheader,
            MuiListItemProps,
          } = route;
          if (breadcrumbName && path) {
            return (
              <ListItemNavLink
                key={path}
                button
                selected={
                  exact ? pathname === path : pathname.indexOf(path) !== -1
                }
                exact={exact}
                to={path}
                icon={icon}
                primary={breadcrumbName}
                {...MuiListItemProps}
                {...ShareMuiListItemProps}
              />
            );
          }
          if (subheader) {
            return (
              <ListSubheader key={subheader} disableSticky>
                {subheader}
              </ListSubheader>
            );
          }
          return null;
        })}
      </List>
    </div>
  );
});

export default SideMenu;
