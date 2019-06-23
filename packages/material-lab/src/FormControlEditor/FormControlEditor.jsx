import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlineEditor from './OutlineEditor';

const styles = theme => {
  return {
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate(14px, -6px) scale(0.75)',
      transformOrigin: 'top left'
    }
  };
};

const useStyles = makeStyles(styles);

const FormControlEditor = ({
  label,
  helperText,
  onContainerClick,
  FormLabelProps,
  EditorProps,
  FormHelperTextProps,
  ...other
}) => {
  const classes = useStyles();
  const [labelWidth, setLabelWidth] = React.useState(0);
  const labelRef = React.useRef();

  React.useEffect(() => {
    const labelNode = ReactDOM.findDOMNode(labelRef.current);
    setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, []);

  return (
    <FormControl {...other}>
      {label && (
        <FormLabel ref={labelRef} className={classes.label} {...FormLabelProps}>
          {label}
        </FormLabel>
      )}
      <OutlineEditor
        EditorProps={EditorProps}
        labelWidth={labelWidth}
        onContainerClick={onContainerClick}
      />
      {helperText && (
        <FormHelperText {...FormHelperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

FormControlEditor.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  FormLabelProps: PropTypes.object,
  EditorProps: PropTypes.object,
  FormHelperTextProps: PropTypes.object
};

export default FormControlEditor;
