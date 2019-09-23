import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { isKeyHotkey } from 'is-hotkey';

import { Editor } from 'slate-react';
import { Value } from 'slate';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import CodeIcon from '@material-ui/icons/Code';
import TitleIcon from '@material-ui/icons/Title';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import StyledToggleButtonGroup from './StyledToggleButtonGroup';

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

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  toolbarDivider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5)
  },
  editor: {
    padding: theme.spacing(2)
  },
  footer: {
    padding: `10px ${theme.spacing(2)}px`,
    textAlign: 'right'
  }
}));

const SlateEditor = ({ initialValues }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(Value.fromJSON(initialValues));
  const editorEl = React.useRef();
  const { document, activeMarks, blocks } = value;
  const activeMarkTypes = activeMarks.map(el => el.get('type'));
  let blockTypes = blocks.map(el => el.get('type'));

  if (blocks.size > 0) {
    const parent = document.getParent(blocks.first().key);
    if (blockTypes.includes('list-item') && parent) {
      blockTypes = blockTypes.push(parent.type);
    }
  }

  const renderMarkButton = (type, icon) => {
    return (
      <ToggleButton
        value={type}
        onMouseDown={event => onClickMark(event, type)}
      >
        {icon}
      </ToggleButton>
    );
  };

  const renderBlockButton = (type, icon) => {
    return (
      <ToggleButton
        value={type}
        onMouseDown={event => onClickBlock(event, type)}
      >
        {icon}
      </ToggleButton>
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

    const hasBlock = type => blocks.some(node => node.type === type);
    const { editor } = editorEl.current;
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
      const isType = blocks.some(block => {
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
    <Paper elevation={0} className={classes.root}>
      <div className={classes.toolbar}>
        <StyledToggleButtonGroup size="small" value={activeMarkTypes.toJS()}>
          {renderMarkButton('bold', <FormatBoldIcon />)}
          {renderMarkButton('italic', <FormatItalicIcon />)}
          {renderMarkButton('underlined', <FormatUnderlinedIcon />)}
          {renderMarkButton('code', <CodeIcon />)}
        </StyledToggleButtonGroup>
        <Divider orientation="vertical" className={classes.toolbarDivider} />
        <StyledToggleButtonGroup size="small" value={blockTypes.toJS()}>
          {renderBlockButton('heading-one', <TitleIcon />)}
          {renderBlockButton('heading-two', <SubtitlesIcon />)}
          {renderBlockButton('block-quote', <FormatQuoteIcon />)}
          {renderBlockButton('numbered-list', <FormatListBulletedIcon />)}
          {renderBlockButton('bulleted-list', <FormatListNumberedIcon />)}
        </StyledToggleButtonGroup>
      </div>
      <Divider />
      <div className={classes.editor}>
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
      </div>
      <Divider />
      <div className={classes.footer}>Characters : {document.text.length}</div>
    </Paper>
  );
};

export default SlateEditor;
