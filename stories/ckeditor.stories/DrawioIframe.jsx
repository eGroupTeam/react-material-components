import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    background: '#fff'
  }
}));

const DrawioIframe = React.forwardRef(function DrawioIframe(props, ref) {
  const classes = useStyles();

  return (
    <iframe
      className={classes.root}
      ref={ref}
      title="drawio editor"
      frameBorder="0"
      {...props}
    />
  );
});

export default DrawioIframe;
