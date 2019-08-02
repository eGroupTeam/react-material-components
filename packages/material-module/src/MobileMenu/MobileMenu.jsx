import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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
  MuiListItmProps,
  ...other
}) => {
  const classes = useStyles();
  return (
    <List className={clsx(classes.root, className)} {...other}>
      {routes.map(el => {
        if (el.breadcrumbName) {
          return (
            <ListItem
              to={el.path}
              component={NavLinkWrapper}
              button
              selected={`${el.path}` === location.pathname}
              key={el.breadcrumbName}
              {...MuiListItmProps}
            >
              {el.icon && <ListItemIcon>{el.icon}</ListItemIcon>}
              <ListItemText primary={el.breadcrumbName} />
            </ListItem>
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
   * Mui ListItem props
   */
  MuiListItmProps: PropTypes.object
};

export default MobileMenu;
