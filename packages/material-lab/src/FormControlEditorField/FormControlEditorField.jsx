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
    handleReturn: handleReturnProp,
    handleKeyCommand: handleKeyCommandProp,
    handleBeforeInput: handleBeforeInputProp,
    handlePastedText: handlePastedTextProp,
    handlePastedFiles: handlePastedFilesProp,
    handleDroppedFiles: handleDroppedFilesProp,
    handleDrop: handleDropProp,
    ...otherEditorProps
  } = EditorProps || {};
  const isError = touched && invalid;

  const handleChange = editorState => {
    input.onChange(editorState);
    if (onChange) {
      onChange(editorState);
    }
  };

  const getHandleReturn = () => {
    if (handleReturnProp) {
      return (e, editorState) =>
        handleReturnProp(e, editorState, {
          input,
          meta: props.meta
        });
    }
    return undefined;
  };

  const getHandleKeyCommand = () => {
    if (handleKeyCommandProp) {
      return (command, editorState) =>
        handleKeyCommandProp(command, editorState, {
          input,
          meta: props.meta
        });
    }
    return undefined;
  };

  const getHandleBeforeInput = () => {
    if (handleBeforeInputProp) {
      return (chars, editorState, eventTimeStamp) =>
        handleBeforeInputProp(chars, editorState, eventTimeStamp, {
          input,
          meta: props.meta
        });
    }
    return undefined;
  };

  const getHandlePastedText = () => {
    if (handlePastedTextProp) {
      return (text, html, editorState) =>
        handlePastedTextProp(text, html, editorState, {
          input,
          meta: props.meta
        });
    }
    return undefined;
  };

  const getHandlePastedFiles = () => {
    if (handlePastedFilesProp) {
      return files =>
        handlePastedFilesProp(files, {
          input,
          meta: props.meta
        });
    }
    return undefined;
  };

  const getHandleDroppedFiles = () => {
    if (handleDroppedFilesProp) {
      return (selection, files) =>
        handleDroppedFilesProp(selection, files, {
          input,
          meta: props.meta
        });
    }
    return undefined;
  };

  const getHandleDrop = () => {
    if (handleDropProp) {
      return (selection, dataTransfer, isInternal) =>
        handleDropProp(selection, dataTransfer, isInternal, {
          input,
          meta: props.meta
        });
    }
    return undefined;
  };

  return (
    <FormControlEditor
      EditorProps={{
        editorState: input.value,
        onChange: handleChange,
        handleReturn: getHandleReturn(),
        handleKeyCommand: getHandleKeyCommand(),
        handleBeforeInput: getHandleBeforeInput(),
        handlePastedText: getHandlePastedText(),
        handlePastedFiles: getHandlePastedFiles(),
        handleDroppedFiles: getHandleDroppedFiles(),
        handleDrop: getHandleDrop(),
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
