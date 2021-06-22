import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import warning from 'warning';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlineEditor from './OutlineEditor';

const styles = theme => ({
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate(14px, -6px) scale(0.75)',
      transformOrigin: 'top left'
    }
  });

const useStyles = makeStyles(styles);

const FormControlEditor = props => {
  const {
    label,
    helperText,
    onContainerClick,
    MuiFormLabelProps,
    EditorProps,
    MuiFormHelperTextProps,
    ...other
  } = props;
  const { onFocus, onBlur } = EditorProps || {};
  const [focused, setFocused] = React.useState(props.focused);
  const classes = useStyles(props);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const labelRef = React.useRef();

  warning(
    false,
    "FormControlEditor is deprecated and it'll drop in next major release please avoid use it."
  );

  React.useEffect(() => {
    const labelNode = ReactDOM.findDOMNode(labelRef.current);
    setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, []);

  const handleFocus = e => {
    if (onFocus) {
      onFocus(e);
    }
    setFocused(true);
  };

  const handleBlur = e => {
    if (onBlur) {
      onBlur(e);
    }
    setFocused(false);
  };

  return (
    <FormControl {...other}>
      {label && (
        <FormLabel
          ref={labelRef}
          className={classes.label}
          focused={focused}
          {...MuiFormLabelProps}
        >
          {label}
        </FormLabel>
      )}
      {/*
        This implementation can be changed when this issue be solved.
        https://github.com/mui-org/material-ui/issues/11865
      */}
      <OutlineEditor
        labelWidth={labelWidth}
        onContainerClick={onContainerClick}
        disabled={props.disabled}
        error={props.error}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focused={focused}
        {...EditorProps}
      />
      {helperText && (
        <FormHelperText {...MuiFormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

FormControlEditor.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  MuiFormLabelProps: PropTypes.object,
  EditorProps: PropTypes.object,
  MuiFormHelperTextProps: PropTypes.object
};

export default FormControlEditor;
