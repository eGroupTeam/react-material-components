import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

const PaperContent = ({ classes, className, children, ...rest }) => (
  <div className={classNames(classes.root, className)} {...rest}>
    {children}
  </div>
);

PaperContent.propTypes = {
  // react-material props
  classes: PropTypes.object.isRequired,
  // customized props
  className: PropTypes.node,
  /**
   * The content of the component.
   */
  children: PropTypes.node
};

export default withStyles(styles)(PaperContent);
