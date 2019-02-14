import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import withStyles from '@material-ui/core/styles/withStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import styles from './styles';

class SideMenuItem extends Component {
  static propTypes = {
    // react-material props
    classes: PropTypes.object.isRequired,
    // customized props
    ListItemProps: PropTypes.object,
    ListItemIconProps: PropTypes.object,
    ListItemTextProps: PropTypes.object.isRequired,
    icon: PropTypes.node,
    items: ImmutablePropTypes.list
  };

  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      classes,
      icon,
      items,
      ListItemProps,
      ListItemTextProps
    } = this.props;

    if (items) {
      return (
        <React.Fragment>
          <ListItem onClick={this.handleClick} {...ListItemProps}>
            {icon && <ListItemIcon>{icon}</ListItemIcon>}
            <ListItemText {...ListItemTextProps} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List disablePadding>
              {items.map((item, index) => (
                <ListItem
                  key={index}
                  className={classes.nested}
                  {...item.ListItemProps}
                >
                  <ListItemText {...item.ListItemTextProps} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }
    return (
      <ListItem {...ListItemProps}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText {...ListItemTextProps} />
      </ListItem>
    );
  }
}

export default withStyles(styles)(SideMenuItem);
