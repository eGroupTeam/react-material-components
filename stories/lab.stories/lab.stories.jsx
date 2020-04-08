import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Map } from 'immutable';
import { EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';
import getEditorState from '@e-group/utils/getEditorState';
import { store } from '../redux/configureStore';

import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Field } from 'redux-form/immutable';
import { Provider } from 'react-redux';
import ButtonMenu from '@e-group/material-lab/ButtonMenu';
import FormControlEditor from '@e-group/material-lab/FormControlEditor';
import FormControlEditorField from '@e-group/material-lab/FormControlEditorField';

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
      const initialValues = Map({
        field1: getEditorState(),
        field2: getEditorState(),
      })
      
      const Form = () => {
        const [values, setValues] = React.useState(initialValues)

        const handleChange = values => {
          setValues(values);
        };

        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={initialValues}>
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

