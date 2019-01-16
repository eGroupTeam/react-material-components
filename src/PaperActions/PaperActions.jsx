import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const PaperActions = ({ classes, className, children, align, ...rest }) => (
  <div
    className={classNames(classes.root, classes[align], className)}
    {...rest}
  >
    {children}
  </div>
);

PaperActions.propTypes = {
  // react-material props
  classes: PropTypes.object.isRequired,
  // customized props
  className: PropTypes.node,
  children: PropTypes.node.isRequired,
  /** Change the action items position to align left, right or center */
  align: PropTypes.string
};

PaperActions.defaultProps = {
  align: 'right'
};

export default withStyles(styles)(PaperActions);
