import React, { forwardRef, ReactNode, useMemo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import {
  ListItem,
  ListItemProps,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

export interface ListItemNavLinkProps
  extends Omit<ListItemProps, 'button' | 'component'> {
  to: string;
  primary?: string;
  icon?: ReactNode;
  expendIcon?: ReactNode;
  exact?: boolean;
  button?: boolean;
}

const ListItemNavLink = forwardRef<unknown, ListItemNavLinkProps>(
  (props, ref) => {
    const { icon, expendIcon, primary, to, exact, button, ...other } = props;

    const renderLink = useMemo(
      () =>
        forwardRef<any, Omit<NavLinkProps, 'to'>>((itemProps, ref) => (
          <NavLink to={to} exact={exact} innerRef={ref} {...itemProps} />
        )),
      [exact, to]
    );

    return (
      <ListItem
        ref={ref}
        button={button as any}
        component={renderLink as any}
        {...other}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
        {expendIcon}
      </ListItem>
    );
  }
);

export default ListItemNavLink;
