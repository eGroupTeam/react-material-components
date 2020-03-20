import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import StyledIconButton from './StyledIconButton';

const NavLinkWrapper = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(theme => ({
  root: {
    bottom: '0',
    left: '0',
    position: 'fixed',
    top: props => props.top,
    zIndex: theme.zIndex.appBar
  },
  container: {
    padding: `${theme.spacing(3)}px 0`
  },
  // react material not support active ListItem so refer to this issue
  // this only work with react-router-dom's NavLink component
  // https://github.com/mui-org/material-ui/issues/1534
  itemActive: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const SideMenu = props => {
  const { routes } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container direction="column">
        {routes.map(route => {
          if (route.breadcrumbName) {
            return (
              <Grid item key={route.path}>
                <StyledIconButton
                  component={NavLinkWrapper}
                  exact={route.exact}
                  to={route.path}
                  activeClassName={classes.itemActive}
                >
                  {route.icon}
                  <Typography variant="caption">
                    {route.breadcrumbName}
                  </Typography>
                </StyledIconButton>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
    </div>
  );
};

SideMenu.propTypes = {
  /**
   * react router props
   */
  routes: PropTypes.array.isRequired,

  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

SideMenu.defaultProps = {
  top: 64
};

export default SideMenu;
