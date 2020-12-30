import React, { FC, forwardRef, ReactNode, useMemo } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import {
  ListItem,
  ListItemProps,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

interface ListItemNavLinkProps
  extends Omit<ListItemProps, 'button' | 'component'> {
  to: string;
  primary?: string;
  icon?: ReactNode;
  exact?: boolean;
  button?: boolean;
}

const ListItemNavLink: FC<ListItemNavLinkProps> = (props) => {
  const { icon, primary, to, exact, button, ...other } = props;

  const renderLink = useMemo(
    () =>
      forwardRef<any, Omit<NavLinkProps, 'to'>>((itemProps, ref) => (
        <NavLink to={to} exact={exact} innerRef={ref} {...itemProps} />
      )),
    [exact, to]
  );

  return (
    <ListItem button={button as any} component={renderLink as any} {...other}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
};

export default ListItemNavLink;
