import { ContentState, EditorState, convertFromRaw } from 'draft-js';

export default function getEditorState(raw, text) {
  if (raw) {
    return EditorState.createWithContent(convertFromRaw(raw));
  }
  if (text) {
    return EditorState.createWithContent(ContentState.createFromText(text));
  }
  return EditorState.createEmpty();
}
