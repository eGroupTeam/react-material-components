import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'slate-react';

const SlateEditor = props => {
  return <Editor {...props} />;
};

SlateEditor.propTypes = {};

export default SlateEditor;
