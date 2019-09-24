import React from 'react';

import Html from 'slate-html-serializer';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { isKeyHotkey } from 'is-hotkey';
import clsx from 'clsx';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { Editor, getEventTransfer } from 'slate-react';
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

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    background: '#ffffff',
    zIndex: 1,
    border: `1px solid ${theme.palette.divider}`,
    width: ({ width }) => width - 2
  },
  toolbarFixed: {
    position: 'fixed',
    top: 0
  },
  toolbarDivider: {
    alignSelf: 'stretch',
    height: 'auto',
    margin: theme.spacing(1, 0.5)
  },
  editor: {
    padding: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderRight: `1px solid ${theme.palette.divider}`
  },
  footer: {
    padding: `10px ${theme.spacing(2)}px`,
    textAlign: 'right',
    border: `1px solid ${theme.palette.divider}`
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '20em'
    // boxShadow: `${isFocused ? '0 0 0 2px blue;' : 'none'}`
  }
}));

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

/**
 * Tags to blocks.
 *
 * @type {Object}
 */

const BLOCK_TAGS = {
  p: 'paragraph',
  li: 'list-item',
  ul: 'bulleted-list',
  ol: 'numbered-list',
  blockquote: 'quote',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
  h3: 'heading-three',
  h4: 'heading-four',
  h5: 'heading-five',
  h6: 'heading-six'
};

/**
 * Tags to marks.
 *
 * @type {Object}
 */

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  s: 'strikethrough',
  code: 'code'
};

/**
 * Serializer rules.
 *
 * @type {Array}
 */

const RULES = [
  {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];

      if (block) {
        return {
          object: 'block',
          type: block,
          nodes: next(el.childNodes)
        };
      }
    }
  },
  {
    deserialize(el, next) {
      const mark = MARK_TAGS[el.tagName.toLowerCase()];

      if (mark) {
        return {
          object: 'mark',
          type: mark,
          nodes: next(el.childNodes)
        };
      }
    }
  },
  {
    // Special case for code blocks, which need to grab the nested childNodes.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'pre') {
        const code = el.childNodes[0];
        const childNodes =
          code && code.tagName.toLowerCase() === 'code'
            ? code.childNodes
            : el.childNodes;

        return {
          object: 'block',
          type: 'code',
          nodes: next(childNodes)
        };
      }
    }
  },
  {
    // Special case for images, to grab their src.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'img') {
        return {
          object: 'block',
          type: 'image',
          nodes: next(el.childNodes),
          data: {
            src: el.getAttribute('src')
          }
        };
      }
    }
  },
  {
    // Special case for links, to grab their href.
    deserialize(el, next) {
      if (el.tagName.toLowerCase() === 'a') {
        return {
          object: 'inline',
          type: 'link',
          nodes: next(el.childNodes),
          data: {
            href: el.getAttribute('href')
          }
        };
      }
    }
  }
];

/**
 * Create a new HTML serializer with `RULES`.
 *
 * @type {Html}
 */

const serializer = new Html({ rules: RULES });

/**
 * The editor's schema.
 *
 * @type {Object}
 */

const schema = {
  blocks: {
    image: {
      isVoid: true
    }
  }
};

const SlateEditor = React.forwardRef(function SlateEditor(props, ref) {
  const { initialValues, ...other } = props;
  const [value, setValue] = React.useState(Value.fromJSON(initialValues));
  const [width, setWidth] = React.useState();
  const classes = useStyles({ width });
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  const rootEl = React.useRef();
  const defaultEditorEl = React.useRef();
  const editorEl = ref || defaultEditorEl;
  const { document, activeMarks, blocks } = value;
  const activeMarkTypes = activeMarks.map(el => el.get('type'));
  let blockTypes = blocks.map(el => el.get('type'));
  if (blocks.size > 0) {
    const parent = document.getParent(blocks.first().key);
    if (blockTypes.includes('list-item') && parent) {
      blockTypes = blockTypes.push(parent.type);
    }
  }

  React.useEffect(() => {
    const handleResize = () => setWidth(rootEl.current.offsetWidth);
    if (rootEl.current && rootEl.current.offsetWidth) {
      setWidth(rootEl.current.offsetWidth);
      window.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'code':
        return (
          <pre>
            <code {...attributes}>{children}</code>
          </pre>
        );
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>;
      case 'heading-four':
        return <h4 {...attributes}>{children}</h4>;
      case 'heading-five':
        return <h5 {...attributes}>{children}</h5>;
      case 'heading-six':
        return <h6 {...attributes}>{children}</h6>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      case 'image':
        const src = node.data.get('src');
        return (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img {...attributes} src={src} className={classes.img} />
        );
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

  /**
   * Render a Slate inline.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  const renderInline = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'link': {
        const { data } = node;
        const href = data.get('href');
        return (
          <a {...attributes} href={href}>
            {children}
          </a>
        );
      }

      default: {
        return next();
      }
    }
  };

  /**
   * On paste, deserialize the HTML and then insert the fragment.
   *
   * @param {Event} event
   * @param {Editor} editor
   */

  const onPaste = (event, editor, next) => {
    event.preventDefault();

    const transfer = getEventTransfer(event);
    const { type, html } = transfer;
    if (type === 'html') {
      const { document } = serializer.deserialize(html);
      editor.insertFragment(document);
    } else {
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
    <div ref={rootEl}>
      <Paper elevation={0}>
        <div
          className={clsx(classes.toolbar, {
            [classes.toolbarFixed]: scrollTrigger
          })}
        >
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
        <div className={classes.editor}>
          <Editor
            ref={editorEl}
            value={value}
            schema={schema}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            renderBlock={renderBlock}
            renderMark={renderMark}
            renderInline={renderInline}
            {...other}
          />
        </div>
        <div className={classes.footer}>
          Characters : {document.text.length}
        </div>
      </Paper>
    </div>
  );
});

export default SlateEditor;
