import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

class EmptyState extends Component {
  static propTypes = {
    // react-material props
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes, title, subTitle } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            {title}
          </Typography>
          <Typography variant="body1" className={classes.subTitle}>
            {subTitle}
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EmptyState);
