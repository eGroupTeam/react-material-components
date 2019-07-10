import React from 'react';
import PropTypes from 'prop-types';
import FormControlEditor from '../FormControlEditor';

const FormControlEditorField = props => {
  const {
    input,
    meta: { touched, error, invalid },
    error: errorProp,
    helperText,
    EditorProps,
    ...other
  } = props;
  const {
    onChange,
    handleKeyCommand: handleKeyCommandProp,
    ...otherEditorProps
  } = EditorProps || {};
  const isError = touched && invalid;

  const handleChange = editorState => {
    input.onChange(editorState);
    if (onChange) {
      onChange(editorState);
    }
  };

  const handleKeyCommand = (command, editorState) => {
    if (handleKeyCommandProp) {
      return handleKeyCommandProp(command, editorState, {
        input,
        meta: props.meta
      });
    }
  };

  return (
    <FormControlEditor
      EditorProps={{
        editorState: input.value,
        onChange: handleChange,
        handleKeyCommand,
        ...otherEditorProps
      }}
      error={isError}
      helperText={isError ? error : helperText}
      {...other}
    />
  );
};

FormControlEditorField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default FormControlEditorField;
