import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { Editor } from 'draft-js';

const styles = theme => {
  const borderColor =
    theme.palette.type === 'light'
      ? 'rgba(0, 0, 0, 0.23)'
      : 'rgba(255, 255, 255, 0.23)';
  return {
    root: {
      position: 'relative',
      cursor: 'text',
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
    label: {
      position: 'absolute',
      top: 0,
      left: 0,
      transform: 'translate(14px, -6px) scale(0.75)',
      transformOrigin: 'top left'
    },
    notchedOutline: {
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
    },
    editor: {
      padding: '18.5px 14px'
    }
  };
};

const FormControlEditor = ({
  classes,
  label,
  helperText,
  onContainerClick,
  FormLabelProps,
  EditorProps,
  FormHelperTextProps,
  ...other
}) => {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const labelRef = React.useRef();
  const editorEl = React.useRef(null);

  React.useEffect(() => {
    const labelNode = ReactDOM.findDOMNode(labelRef.current);
    setLabelWidth(labelNode != null ? labelNode.offsetWidth : 0);
  }, []);

  const handleContainerClick = () => {
    if (onContainerClick) {
      onContainerClick(editorEl.current);
    } else {
      editorEl.current.focus();
    }
  };

  return (
    <FormControl className={classes.root} {...other}>
      {label && (
        <FormLabel ref={labelRef} className={classes.label} {...FormLabelProps}>
          {label}
        </FormLabel>
      )}
      <fieldset className={classes.notchedOutline}>
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
      <div className={classes.editor} onClick={handleContainerClick}>
        <Editor ref={editorEl} {...EditorProps} />
      </div>
      {helperText && (
        <FormHelperText {...FormHelperTextProps}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

FormControlEditor.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.string,
  FormLabelProps: PropTypes.object,
  EditorProps: PropTypes.object,
  FormHelperTextProps: PropTypes.object
};

export default withStyles(styles)(FormControlEditor);
