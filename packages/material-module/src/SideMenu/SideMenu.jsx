import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const NavLinkWrapper = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: theme.spacing(32)
  }
}));

const SideMenu = React.forwardRef(function SideMenu(props, ref) {
  const {
    className,
    routes,
    location,
    MuiListProps,
    MuiListItemProps: ShareMuiListItemProps,
    MuiListItemIconProps: ShareMuiListItemIconProps,
    MuiListItemTextProps: ShareMuiListItemTextProps,
    ...other
  } = props;
  const classes = useStyles(props);

  return (
    <div ref={ref} className={clsx(classes.root, className)} {...other}>
      <List {...MuiListProps}>
        {routes.map(route => {
          const {
            breadcrumbName,
            path,
            exact,
            icon,
            subheader,
            MuiListItemProps,
            MuiListItemIconProps,
            MuiListItemTextProps
          } = route;
          if (breadcrumbName) {
            return (
              <ListItem
                key={path}
                button
                selected={
                  exact
                    ? location.pathname === path
                    : location.pathname.indexOf(path) !== -1
                }
                component={NavLinkWrapper}
                exact={exact}
                to={path}
                {...MuiListItemProps}
                {...ShareMuiListItemProps}
              >
                {icon && (
                  <ListItemIcon
                    {...MuiListItemIconProps}
                    {...ShareMuiListItemIconProps}
                  >
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={breadcrumbName}
                  {...MuiListItemTextProps}
                  {...ShareMuiListItemTextProps}
                />
              </ListItem>
            );
          }
          if (subheader) {
            return <ListSubheader>{subheader}</ListSubheader>;
          }
          return null;
        })}
      </List>
    </div>
  );
});

SideMenu.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * react router props
   */
  routes: PropTypes.array.isRequired,
  /**
   * react router props
   */
  location: PropTypes.object.isRequired,
  /**
   * Mui `List` props.
   */
  MuiListProps: PropTypes.object,
  /**
   * Mui `ListItem` props.
   */
  MuiListItemProps: PropTypes.object,
  /**
   * Mui `ListItemIcon` props.
   */
  MuiListItemIconProps: PropTypes.object,
  /**
   * Mui `ListItemText` props.
   */
  MuiListItemTextProps: PropTypes.object
};

export default SideMenu;
