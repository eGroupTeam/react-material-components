import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import SideMenuItem from 'components/SideMenuItem';

import styles from './styles';

class SideMenu extends Component {
  static propTypes = {
    // react-material props
    classes: PropTypes.object.isRequired,
    // react-router-dom props
    routes: PropTypes.array.isRequired
  };

  render() {
    const { classes, routes } = this.props;
    return (
      <React.Fragment>
        <Grid container alignItems="center" className={classes.header}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom color="textPrimary">
              大立光電股份有限公司
            </Typography>
            <Typography variant="caption" color="textSecondary">
              訪客管理系統-承攬商專區 v1.0.0
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <List component="nav">
          {routes.map((route, index) => (
            <SideMenuItem
              key={index}
              ListItemProps={{
                button: true,
                component: NavLink,
                activeClassName: classes.itemActive,
                exact: route.exact,
                to: route.path
              }}
              ListItemTextProps={{
                primary: route.breadcrumbName
              }}
            />
          ))}
        </List>
      </React.Fragment>
    );
  }
}

export default compose(withStyles(styles))(SideMenu);
