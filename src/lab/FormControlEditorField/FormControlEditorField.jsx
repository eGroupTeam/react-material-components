import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import FormControlEditor from '../FormControlEditor';

const FormControlEditorField = ({
  input,
  meta,
  EditorProps: {
    onChange,
    handleKeyCommand: handleKeyCommandProp,
    ...otherEditorProps
  },
  ...other
}) => {
  const handleChange = editorState => {
    input.onChange(editorState);
    if (onChange) {
      onChange(editorState);
    }
  };

  const handleKeyCommand = (command, editorState) =>
    handleKeyCommandProp(command, editorState, { input, meta });

  return (
    <FormControlEditor
      EditorProps={{
        editorState: input.value,
        onChange: handleChange,
        handleKeyCommand,
        ...otherEditorProps
      }}
      {...other}
    />
  );
};

FormControlEditorField.propTypes = {
  // redux form props
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  meta: PropTypes.shape(fieldMetaPropTypes).isRequired
};

export default FormControlEditorField;
