import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fromJS } from 'immutable';
import { EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';
import getEditorState from '@e-group/utils/getEditorState';
import { store } from '../redux/configureStore';

import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Field } from 'redux-form/immutable';
import { Provider } from 'react-redux';
import ButtonMenu from '@e-group/material-lab/ButtonMenu';
import FormControlEditor from '@e-group/material-lab/FormControlEditor';
import FormControlEditorField from '@e-group/material-lab/FormControlEditorField';

import SlateEditor from '@e-group/material-lab/SlateEditor';

import MediaStreamClipper from '@e-group/material-lab/MediaStreamClipper';
import useGetVideoSnapshot from '@e-group/material-lab/MediaStreamClipper/useGetVideoSnapshot';
import Snackbar from '@e-group/material-lab/Snackbar';
import SnackbarContent from '@e-group/material-lab/Snackbar/SnackbarContent';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';

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
      const data = fromJS({
        "field1": "{\"blocks\":[{\"key\":\"d6103\",\"text\":\"aaa\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"eqn3a\",\"text\":\"a\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"78jhc\",\"text\":\"a\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"avijq\",\"text\":\"a\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4nl8h\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7udgf\",\"text\":\"aaa\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
        "field2": "{\"blocks\":[{\"key\":\"e1nko\",\"text\":\"aaaaa\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
      })
      const field1 = getEditorState(JSON.parse(data.get('field1')))
      const field2 = getEditorState(JSON.parse(data.get('field2')));
      const initialValues = data.set('field1', field1).set('field2', field2)
      const Form = () => {
        const [values, setValues] = React.useState(initialValues)

        const handleChange = values => {
          setValues(values);
        };

        const handleSubmit = (values) => {
          setValues(values);
        }

        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onSubmit={handleSubmit} onChange={handleChange} initialValues={initialValues}>
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
                  label="with error"
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'error message'
                  }}
                />
                <Button type="submit">Submit</Button>
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={
                  JSON.stringify({
                    field1: convertToRaw(values.get('field1').getCurrentContent()),
                    field2: convertToRaw(values.get('field2').getCurrentContent()),
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
      const initialValue = {
        "object": "value",
        "document": {
          "object": "document",
          "nodes": [
            {
              "object": "block",
              "type": "paragraph",
              "nodes": [
                {
                  "object": "text",
                  "text": "This is editable "
                },
                {
                  "object": "text",
                  "text": "rich",
                  "marks": [{ "type": "bold" }]
                },
                {
                  "object": "text",
                  "text": " text, "
                },
                {
                  "object": "text",
                  "text": "much",
                  "marks": [{ "type": "italic" }]
                },
                {
                  "object": "text",
                  "text": " better than a "
                },
                {
                  "object": "text",
                  "text": "<textarea>",
                  "marks": [{ "type": "code" }]
                },
                {
                  "object": "text",
                  "text": "!"
                }
              ]
            },
            {
              "object": "block",
              "type": "paragraph",
              "nodes": [
                {
                  "object": "text",
                  "text": "Since it's rich text, you can do things like turn a selection of text "
                },
                {
                  "object": "text",
                  "text": "bold",
                  "marks": [{ "type": "bold" }]
                },
                {
                  "object": "text",
                  "text": ", or add a semantically rendered block quote in the middle of the page, like this:"
                }
              ]
            },
            {
              "object": "block",
              "type": "block-quote",
              "nodes": [
                {
                  "object": "text",
                  "text": "A wise quote."
                }
              ]
            },
            {
              "object": "block",
              "type": "paragraph",
              "nodes": [
                {
                  "object": "text",
                  "text": "Try it out for yourself!"
                }
              ]
            }
          ]
        }
      }
      
      return (
        <Container><SlateEditor initialValues={initialValue}/></Container>
      );
    }
  )
  .add('MediaStreamClipper',
    () => {
      const Demo = () => {
        const [facingMode, setFacingMode] = React.useState('user')
        const [blob, setBlob] = React.useState()

        const handleGetIntervalShot = blob => {
          setBlob(URL.createObjectURL(blob))
        };

        const handleClick = () => {
          setFacingMode(val =>
            val === 'user' ? 'environment' : 'user'
          )
        }

        return (
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h6">Streaming</Typography>
              <MediaStreamClipper
                facingMode={facingMode}
                handleGetIntervalShot={handleGetIntervalShot}
                muted
                controls
                autoPlay
                mirrored
              />
              <br />
              <button onClick={handleClick}>Change facingMode</button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Snapshots</Typography>
              <img src={blob} alt=""/>
            </Grid>
          </Grid>
        )
      }
      return (
        <Demo />
      )
    }
  )
  .add('useGetVideoSnapshot',
  () => {
    const Demo = () => {
      const [getVideoSnapshot, videoEl] = useGetVideoSnapshot();
      const [blob, setBlob] = React.useState()

      const handleClick = async () => {
        const blob = await getVideoSnapshot('image/jpeg', 0.8);
        setBlob(URL.createObjectURL(blob))
      };

      return (
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h6">Video</Typography>
            <video ref={videoEl} src='/video.mp4' autoPlay controls/>
            <br />
            <Button variant="contained" onClick={handleClick}>Snapshot</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Snapshots</Typography>
            <img src={blob} alt=""/>
          </Grid>
        </Grid>
      )
    }
    return (
      <Demo />
    )
  }
)
.add(
  'Snackbar',
  () => {
    const Demo = () => {
      const [isOpen, setIsOpen] = React.useState(false)
      return (
        <React.Fragment>
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="default"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="success"
            variant="success"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="warning"
            variant="warning"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="error"
            variant="error"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            autoHideDuration={2000}
          />
          <Snackbar
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            message="info"
            variant="info"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            autoHideDuration={2000}
          />
          <button onClick={() => setIsOpen(true)}>show</button>
          <SnackbarContent
            action={[]}
            message="default"
          />
          <SnackbarContent
            action={[]}
            message="success"
            variant="success"
          />
          <SnackbarContent
            action={[]}
            message="warning"
            variant="warning"
          />
          <SnackbarContent
            action={[]}
            message="error"
            variant="error"
          />
          <SnackbarContent
            action={[]}
            message="info"
            variant="info"
          />
        </React.Fragment>
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

