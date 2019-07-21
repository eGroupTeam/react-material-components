import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

const styles = theme => ({
  root: {
    paddingLeft: 8,
    position: 'absolute',
    bottom: 0,
    right: 0,
    top: -5,
    left: 0,
    pointerEvents: 'none',
    margin: 0,
    padding: 0,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    transition: theme.transitions.create(
      ['padding-left', 'border-color', 'border-width'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }
    )
  },
  legend: {
    textAlign: 'left',
    padding: 0,
    lineHeight: '11px',
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    })
  }
});

const useStyles = makeStyles(styles);

const NotchedOutline = ({ className, labelWidth, ...other }) => {
  const classes = useStyles();

  return (
    <fieldset className={clsx(classes.root, className)} {...other}>
      <legend
        className={classes.legend}
        style={{
          // IE 11: fieldset with legend does not render
          // a border radius. This maintains consistency
          // by always having a legend rendered
          width: labelWidth
        }}
      >
        {/* Use the nominal use case of the legend, avoid rendering artefacts. */}
        {/* eslint-disable-next-line react/no-danger */}
        <span dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
      </legend>
    </fieldset>
  );
};

NotchedOutline.propTypes = {
  labelWidth: PropTypes.number.isRequired
};

export default NotchedOutline;
