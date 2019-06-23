import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import formControlState from '@material-ui/core/FormControl/formControlState';
import withFormControlContext from '@material-ui/core/FormControl/withFormControlContext';

import { Editor } from 'draft-js';
import NotchedOutline from './NotchedOutline';

const styles = theme => {
  const borderColor =
    theme.palette.type === 'light'
      ? 'rgba(0, 0, 0, 0.23)'
      : 'rgba(255, 255, 255, 0.23)';
  return {
    root: {
      position: 'relative',
      '& $notchedOutline': {
        borderColor
      },
      '&:hover $notchedOutline': {
        borderColor: theme.palette.text.primary,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          borderColor
        }
      },
      '&$focused $notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2
      },
      '&$error $notchedOutline': {
        borderColor: theme.palette.error.main
      },
      '&$disabled $notchedOutline': {
        borderColor: theme.palette.action.disabled
      }
    },
    editorContainer: {
      padding: '18.5px 14px'
    },
    notchedOutline: {},
    error: {}
  };
};

const useStyles = makeStyles(styles);
const OutlineEditor = React.forwardRef(function OutlineEditor(props, ref) {
  const {
    className: classNameProp,
    EditorProps,
    labelWidth,
    onContainerClick,
    muiFormControl
  } = props;
  const classes = useStyles();
  const editorEl = React.useRef(null);
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['required', 'focused', 'disabled', 'error', 'filled']
  });
  const handleContainerClick = () => {
    if (onContainerClick) {
      onContainerClick(editorEl.current);
    } else {
      editorEl.current.focus();
    }
  };

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.disabled]: fcs.disabled,
          [classes.error]: fcs.error,
          [classes.filled]: fcs.filled,
          [classes.focused]: fcs.focused,
          [classes.required]: fcs.required
        },
        classNameProp
      )}
      ref={ref}
    >
      <NotchedOutline
        className={classes.notchedOutline}
        labelWidth={labelWidth}
      />
      <div className={classes.editorContainer} onClick={handleContainerClick}>
        <Editor ref={editorEl} {...EditorProps} />
      </div>
    </div>
  );
});

OutlineEditor.propTypes = {
  labelWidth: PropTypes.number.isRequired,
  EditorProps: PropTypes.object,
  onContainerClick: PropTypes.func,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
   */
  muiFormControl: PropTypes.object
};

export default withFormControlContext(OutlineEditor);
