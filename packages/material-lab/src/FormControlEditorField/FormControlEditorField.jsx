import React from 'react';
import PropTypes from 'prop-types';
import FormControlEditor from '../FormControlEditor';

const FormControlEditorField = ({ input, meta, EditorProps, ...other }) => {
  const {
    onChange,
    handleKeyCommand: handleKeyCommandProp,
    ...otherEditorProps
  } = EditorProps || {};

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
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default FormControlEditorField;
