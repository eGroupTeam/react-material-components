import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';

import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@e-group/material/Button';
import { Field } from 'redux-form/immutable';
import { Provider } from 'react-redux';
import ButtonMenu from '@e-group/material-lab/ButtonMenu';
import FormControlEditor from '@e-group/material-lab/FormControlEditor';
import FormControlEditorField from '@e-group/material-lab/FormControlEditorField';
import SlateEditor from '@e-group/material-lab/SlateEditor';
import { Value } from 'slate'

storiesOf('Lab', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'ButtonMenu',
    () => {
      const Demo = () => (
        <ButtonMenu
          id="foo"
          button={<Button onClick={action('clicked 1')}>test</Button>}
        >
          <MenuItem onClick={action('clicked 2')}>item1</MenuItem>
          <MenuItem onClick={action('clicked 3')}>item2</MenuItem>
        </ButtonMenu>
      );
      return <Demo />;
    },
    {
      info: {
        propTables: [ButtonMenu]
      }
    }
  )
  .add(
    'FormControlEditor',
    () => {
      const MyFormControllEditor = () => {
        const [editorState, setEditorState] = React.useState(
          EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          )
        );

        const handleKeyCommand = (command, editorState) => {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            setEditorState(newState);
            return 'handled';
          }
          return 'not-handled';
        };

        return (
          <React.Fragment>
            <FormControlEditor
              fullWidth
              label="error"
              helperText="helperText"
              EditorProps={{
                editorState: editorState,
                handleKeyCommand: handleKeyCommand,
                onChange: editorState => setEditorState(editorState)
              }}
            />
          </React.Fragment>
        );
      };
      return <MyFormControllEditor />;
    },
    {
      info: {
        propTables: [FormControlEditor]
      }
    }
  )
  .add(
    'FormControlEditorField',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          ),
          field2: EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          ),
          field3: EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          )
        });

        const handleChange = values => {
          setValues({
            field1: values.get('field1'),
            field2: values.get('field2'),
            field3: values.get('field3'),
          });
        };

        const handleKeyCommand = (command, editorState, { input }) => {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            input.onChange(newState);
            return 'handled';
          }
          return 'not-handled';
        };

        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  component={FormControlEditorField}
                  name="field1"
                  fullWidth
                  margin="normal"
                  label="default"
                />
                <Field
                  component={FormControlEditorField}
                  name="field2"
                  fullWidth
                  margin="normal"
                  label="with handleKeyCommand"
                  EditorProps={{
                    handleKeyCommand
                  }}
                />
                <Field
                  component={FormControlEditorField}
                  name="field3"
                  fullWidth
                  margin="normal"
                  label="with error"
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'error message'
                  }}
                />
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={
                  JSON.stringify({
                    field1: convertToRaw(values.field1.getCurrentContent()),
                    field2: convertToRaw(values.field2.getCurrentContent())
                  },
                  null,
                  4
                )}
                type="language-json"
              />
            </Grid>
          </Grid>
        );
      };
      return <Form />;
    },
    {
      info: {
        propTables: [FormControlEditor]
      }
    }
  )
  .add(
    'SlateEditor',
    () => {
      const initialValue = Value.fromJSON({
        document: {
          nodes: [
            {
              object: 'block',
              type: 'paragraph',
              nodes: [
                {
                  object: 'text',
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      })
      function MarkHotkey(options) {
        // Grab our options from the ones passed in.
        const { type, key } = options

        // Return our "plugin" object, containing the `onKeyDown` handler.
        return {
          onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key != key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
          },
        }
      }
      const plugins = [
        MarkHotkey({ key: 'b', type: 'bold' }),
        MarkHotkey({ key: '`', type: 'code' }),
        MarkHotkey({ key: 'i', type: 'italic' }),
        MarkHotkey({ key: '~', type: 'strikethrough' }),
        MarkHotkey({ key: 'u', type: 'underline' }),
      ]
      const Demo = () => {
        const [value, setValue] = React.useState(initialValue)

        const onChange = ({ value }) => {
          setValue(value)
        }
        // Add a `renderMark` method to render marks.
        const renderMark = (props, editor, next) => {
          switch (props.mark.type) {
            case 'bold':
              return <strong>{props.children}</strong>
            // Add our new mark renderers...
            case 'code':
              return <code>{props.children}</code>
            case 'italic':
              return <em>{props.children}</em>
            case 'strikethrough':
              return <del>{props.children}</del>
            case 'underline':
              return <u>{props.children}</u>
            default:
              return next()
          }
        }
        return (
          <SlateEditor
            plugins={plugins}
            value={value}
            onChange={onChange}
            renderMark={renderMark}
          />
        )
      };
      return <Demo />;
    },
    {
      info: {
        propTables: [ButtonMenu]
      }
    }
  );
