import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`
  },
  vertical: {
    position: 'relative',
    top: '-0.06em',
    display: 'inline-block',
    height: '0.9em',
    margin: '0 8px',
    verticalAlign: 'middle',
    borderTop: 0,
    borderLeft: `1px solid ${theme.palette.divider}`,

    '&$dashed': {
      borderWidth: '0 0 0 1px'
    }
  },
  horizontal: {
    display: 'flex',
    clear: 'both',
    width: '100%',
    minWidth: '100%', // Fix https://github.com/ant-design/ant-design/issues/10914
    margin: '24px 0',

    '&$withText': {
      display: 'flex',
      margin: ' 16px 0',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      borderTop: 0,

      '&::before, &::after': {
        position: 'relative',
        top: '50%',
        width: '50%',
        borderTop: `1px solid ${theme.palette.divider}`,
        transform: 'translateY(50%)',
        content: '""'
      },
      '&$dashed': {
        borderTop: 0,

        '&::before, &::after': {
          borderStyle: 'dashed none none'
        }
      },
      '&$withTextLeft': {
        '&::before': {
          top: '50%',
          width: '5%'
        },
        '&::after': {
          top: '50%',
          width: '95%'
        }
      },
      '&$withTextRight': {
        '&::before': {
          top: '50%',
          width: '95%'
        },
        '&::after': {
          top: '50%',
          width: '5%'
        }
      }
    }
  },
  withText: props => ({
    ...theme.typography[props.headingVariant],
    lineHeight: 1
  }),
  withTextLeft: {},
  withTextRight: {},
  innerText: {
    display: 'inline-block',
    padding: theme.spacing(0, 1)
  },
  dashed: {
    background: 'none',
    borderColor: theme.palette.divider,
    borderStyle: 'dashed',
    borderWidth: '1px 0 0'
  },
  plain: {
    '&$withText': {
      ...theme.typography.body1,
      lineHeight: 1
    }
  }
});

/**
 * Re implement Ant Design Divider component with react-material coding style.
 * https://github.com/ant-design/ant-design/blob/master/components/divider/index.tsx
 * @param {*} props
 */
const Divider = props => {
  const {
    classes,
    className,
    children,
    type,
    orientation,
    dashed,
    plain,
    headingVariant,
    ...other
  } = props;
  const hasChildren = !!children;
  const orientationPrefix =
    orientation.length > 0
      ? `${orientation.charAt(0).toUpperCase()}${orientation.slice(1)}`
      : orientation;

  return (
    <div
      className={clsx(
        classes.root,
        classes[type],
        {
          [classes.withText]: hasChildren,
          [classes[`withText${orientationPrefix}`]]: hasChildren,
          [classes.dashed]: !!dashed,
          [classes.plain]: !!plain
        },
        className
      )}
      {...other}
      role="separator"
    >
      {children && <span className={classes.innerText}>{children}</span>}
    </div>
  );
};

Divider.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * JSX attribute
   */
  className: PropTypes.string,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * direction type of divider
   */
  type: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * divider text show as plain style
   */
  plain: PropTypes.bool,
  /**
   * whether line is dashed
   */
  dashed: PropTypes.bool,
  /**
   * position of title inside divider
   */
  orientation: PropTypes.oneOf(['left', 'right', 'center']),

  headingVariant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

Divider.defaultProps = {
  type: 'horizontal',
  plain: true,
  dashed: false,
  orientation: 'center',
  headingVariant: 'h6'
};

export default withStyles(styles)(Divider);
