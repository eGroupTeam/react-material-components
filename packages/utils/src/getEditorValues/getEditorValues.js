import { convertToRaw } from 'draft-js';

export default function getEditorValues(editorState) {
  if (!editorState) {
    return {};
  }
  const contentState = editorState.getCurrentContent();
  return {
    raw: JSON.stringify(convertToRaw(contentState)),
    plainText: contentState.getPlainText(),
  };
}
