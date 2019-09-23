import { Editor } from 'slate-react';
import { Value } from 'slate';

import React from 'react';
import { isKeyHotkey } from 'is-hotkey';
import { Button, Icon, Toolbar } from './components';

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const SlateEditor = ({ initialValues }) => {
  const [value, setValue] = React.useState(Value.fromJSON(initialValues));
  const editorEl = React.useRef();

  const hasMark = type => {
    return value.activeMarks.some(mark => mark.type === type);
  };

  const hasBlock = type => {
    return value.blocks.some(node => node.type === type);
  };

  const renderMarkButton = (type, icon) => {
    const isActive = hasMark(type);

    return (
      <Button active={isActive} onMouseDown={event => onClickMark(event, type)}>
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  const renderBlockButton = (type, icon) => {
    let isActive = hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { document, blocks } = value;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };

  const renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  const onChange = ({ value }) => {
    setValue(value);
  };

  const onKeyDown = (event, editor, next) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };

  const onClickMark = (event, type) => {
    event.preventDefault();
    editorEl.current.toggleMark(type);
  };

  const onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type);
      const isList = hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  };

  return (
    <React.Fragment>
      <Toolbar>
        {renderMarkButton('bold', 'format_bold')}
        {renderMarkButton('italic', 'format_italic')}
        {renderMarkButton('underlined', 'format_underlined')}
        {renderMarkButton('code', 'code')}
        {renderBlockButton('heading-one', 'looks_one')}
        {renderBlockButton('heading-two', 'looks_two')}
        {renderBlockButton('block-quote', 'format_quote')}
        {renderBlockButton('numbered-list', 'format_list_numbered')}
        {renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </Toolbar>
      <Editor
        spellCheck
        autoFocus
        placeholder="Enter some rich text..."
        ref={editorEl}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        renderBlock={renderBlock}
        renderMark={renderMark}
      />
    </React.Fragment>
  );
};

export default SlateEditor;
