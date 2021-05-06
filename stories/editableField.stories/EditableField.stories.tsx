import React, { useState } from 'react';

import { useDispatch, Provider } from 'react-redux';
import { initialize, Field } from 'redux-form';
import { Meta, Story } from '@storybook/react';

import { Grid, TextField, Typography } from '@material-ui/core';
import FormFieldGroup from '@e-group/material/FormFieldGroup';
import EditableField, {
  EditableFieldProps,
} from '@e-group/material/EditableField';
import EditableFieldShowing from '@e-group/material/EditableFieldShowing';
import makeEditableFieldUtils from '@e-group/hooks/makeEditableFieldUtils';
import TextLoadingField from '@e-group/material-form/TextLoadingField';
import { store } from '../redux/configureStore';
import ReduxForm, { FORM } from '../components/ReduxForm';
import Highlight from '../components/Highlight';

type Values = {
  field1: string;
  field2: string;
  field3: string;
};
const useEditableFieldUtils = makeEditableFieldUtils<Values>(FORM);

export default {
  title: 'Components/EditableField',
  component: EditableField,
  argTypes: {
    implementation: {
      control: {
        type: 'radio',
        options: ['css', 'js'],
      },
    },
    readonly: { control: 'boolean' },
  },
} as Meta;

export const Default: Story<EditableFieldProps> = (args) => {
  const [text, setText] = useState('Click here to start editing');
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSave = (e, { closeEditing }) => {
    closeEditing();
  };
  return (
    <EditableField onSaveClick={handleSave} {...args}>
      <EditableFieldShowing>
        <Typography variant="body1">{text}</Typography>
      </EditableFieldShowing>
      <TextField
        label="editing field"
        value={text}
        onChange={handleChange}
        fullWidth
      />
    </EditableField>
  );
};

export const WithFormFieldGroup: Story = () => {
  return (
    <FormFieldGroup required label="Field 1">
      <EditableField
        onSaveClick={(e, { closeEditing }) => {
          closeEditing();
        }}
        style={{ marginLeft: -8 }}
      >
        <EditableFieldShowing>
          <Typography variant="body1">Value</Typography>
        </EditableFieldShowing>
        <TextField label="Label" fullWidth />
      </EditableField>
    </FormFieldGroup>
  );
};

const Demo = () => {
  const { formValues, handleSave, handleClose } = useEditableFieldUtils();
  const [values, setValues] = useState<Values>({
    field1: 'field1',
    field2: 'field2',
    field3: 'field3',
  });
  const dispatch = useDispatch();

  const handleChange = (values) => {
    setValues(values);
  };

  const handleSubmit = (values) => {
    dispatch(initialize(FORM, values, false));
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <ReduxForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          initialValues={values}
        >
          <FormFieldGroup required label="Field 1">
            <EditableField
              onSaveClick={handleSave}
              onCloseClick={handleClose}
              disableClickAwayCloseEditing
              style={{ marginLeft: -8 }}
            >
              <EditableFieldShowing>
                <Typography variant="body1">{formValues.field1}</Typography>
              </EditableFieldShowing>
              <Field
                label="editing field"
                name="field1"
                margin="normal"
                component={TextLoadingField}
                fullWidth
              />
            </EditableField>
            <EditableField
              onSaveClick={handleSave}
              onCloseClick={handleClose}
              disableClickAwayCloseEditing
              style={{ marginLeft: -8 }}
            >
              <EditableFieldShowing>
                <Typography variant="body1">{formValues.field2}</Typography>
              </EditableFieldShowing>
              <Field
                label="editing field2"
                name="field2"
                margin="normal"
                component={TextLoadingField}
                fullWidth
              />
            </EditableField>
            <EditableField
              onSaveClick={handleSave}
              onCloseClick={handleClose}
              disableClickAwayCloseEditing
              style={{ marginLeft: -8 }}
            >
              <EditableFieldShowing>
                <Typography variant="body1">{formValues.field3}</Typography>
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
        </ReduxForm>
      </Grid>
      <Grid item xs={6}>
        <Highlight
          code={JSON.stringify(values, null, 4)}
          type="language-json"
        />
      </Grid>
    </Grid>
  );
};

export const WithReduxFormField: Story = () => {
  return (
    <Provider store={store}>
      <Demo />
    </Provider>
  );
};
