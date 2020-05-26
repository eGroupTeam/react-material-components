import React from 'react';

import { useDispatch } from "react-redux";
import { initialize } from 'redux-form/immutable'
import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from '../redux/configureStore';

import { Provider } from 'react-redux';
import { Field } from 'redux-form/immutable'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormFieldGroup from '@e-group/material-lab/FormFieldGroup';
import EditableField from '@e-group/material-lab/EditableField';
import EditableFieldShowing from '@e-group/material-lab/EditableFieldShowing';
import makeEditableFieldUtils from '@e-group/material-lab/makeEditableFieldUtils';
import TextLoadingField from '@e-group/material-form/TextLoadingField';
import ImmutableJsReduxForm, { FORM } from '../components/ImmutableJsReduxForm';
import Highlight from '../components/Highlight';

const stories = storiesOf('EditableField', module);

const Demo = (props) => {
  const [text, setText] = React.useState("Click here to start editing")
  const handleChange = e => {
    setText(e.target.value)
  }
  const handleSave = (e, { closeEditing }) => {
    closeEditing()
  }
  return (
    <EditableField onSaveClick={handleSave} {...props}>
      <EditableFieldShowing>
        <Typography variant="body1">
          {text}
        </Typography>
      </EditableFieldShowing>
      <TextField label="editing field" value={text} onChange={handleChange} fullWidth/>
    </EditableField>
  );
}

stories.addDecorator(story => <Provider store={store}>{story()}</Provider>).add(
  'default',
  () => {
    return (<Demo />);
  },
  {
    info: {
      propTables: [EditableField]
    }
  }
)

stories.add(
  'with FormFieldGroup',
  () => {
    return (<FormFieldGroup required label="Field 1"><Demo style={{ marginLeft: -8 }} /></FormFieldGroup>);
  },
  {
    info: {
      propTables: [EditableField]
    }
  }
)

const useEditableFieldUtils = makeEditableFieldUtils(FORM)

stories.add(
  'with redux form',
  () => {
    const FormDemo = () => {
      const {
        formValues,
        handleSave,
        handleClose
      } = useEditableFieldUtils()
      const [values, setValues] = React.useState({
        field1: 'field1',
        field2: 'field2',
        field3: 'field3',
      });
      const dispatch = useDispatch()

      const handleChange = values => {
        setValues(values.toJS());
      };

      const handleSubmit = (values) => {
        dispatch(
          initialize(FORM, values.toJS(), false)
        )
      }

      return (
        <Grid container>
          <Grid item xs={6}>
            <ImmutableJsReduxForm onChange={handleChange} onSubmit={handleSubmit} initialValues={fromJS(values)}>
              <FormFieldGroup required label="Field 1">
                <EditableField onSaveClick={handleSave} onCloseClick={handleClose} disableClickAwayCloseEditing style={{ marginLeft: -8 }}>
                  <EditableFieldShowing>
                    <Typography variant="body1">
                      {formValues.get("field1")}
                    </Typography>
                  </EditableFieldShowing>
                  <Field
                    label="editing field"
                    name="field1"
                    margin="normal"
                    component={TextLoadingField}
                    fullWidth
                  />
                </EditableField>
                <EditableField onSaveClick={handleSave} onCloseClick={handleClose} disableClickAwayCloseEditing style={{ marginLeft: -8 }}>
                  <EditableFieldShowing>
                    <Typography variant="body1">
                      {formValues.get("field2")}
                    </Typography>
                  </EditableFieldShowing>
                  <Field
                    label="editing field2"
                    name="field2"
                    margin="normal"
                    component={TextLoadingField}
                    fullWidth
                  />
                </EditableField>
                <EditableField onSaveClick={handleSave} onCloseClick={handleClose} disableClickAwayCloseEditing style={{ marginLeft: -8 }}>
                  <EditableFieldShowing>
                    <Typography variant="body1">
                      {formValues.get("field3")}
                    </Typography>
                  </EditableFieldShowing>
                  <Field
                    label="editing field3"
                    name="field3"
                    margin="normal"
                    component={TextLoadingField}
                    fullWidth
                  />
                </EditableField>
              </FormFieldGroup>
            </ImmutableJsReduxForm>
          </Grid>
          <Grid item xs={6}>
            <Highlight
              code={JSON.stringify(values, null, 4)}
              type="language-json"
            />
            </Grid>
        </Grid>
      );
    }
    return (<FormDemo />);
  },
  {
    info: {
      propTables: [EditableField]
    }
  }
)