import React, { FC, forwardRef, ReactNode, useEffect, useState } from 'react';

import { NavLink, NavLinkProps } from 'react-router-dom';
import {
  makeStyles,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';

const NavLinkWrapper = forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => <NavLink innerRef={ref} {...props} />
);

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: '0',
    left: '0',
    position: 'fixed',
    zIndex: theme.zIndex.appBar,
  },
}));

export type Route = {
  path: string;
  breadcrumbName?: string;
  icon?: ReactNode;
  exact?: boolean;
  routes?: Route[];
};

export interface BottomNavigationMenuProps {
  /**
   * react router props
   */
  routes: Route[];
  /**
   * react router props
   */
  pathname: string;
  /**
   * Set root path to identify and set correct value.
   */
  rootPath?: string;
}

const BottomNavigationMenu: FC<BottomNavigationMenuProps> = (props) => {
  const { pathname, routes, rootPath = '/' } = props;
  const classes = useStyles(props);
  const [value, setValue] = useState(pathname);

  useEffect(() => {
    const firstPath = pathname.split('/')[2];
    if (firstPath) {
      setValue(`${rootPath}/${firstPath}`);
    } else {
      setValue(rootPath);
    }
  }, [pathname, rootPath]);

  return (
    <div className={classes.root}>
      <BottomNavigation value={value}>
        {routes.map((route) => {
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

export default BottomNavigationMenu;
