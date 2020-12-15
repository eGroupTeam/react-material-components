import React, { FC, useState } from 'react';

import { isImmutable, List, fromJS } from '@e-group/immutable';

import { Provider } from 'react-redux';
import ReactSelectField from '@e-group/material-form/immutable/ReactSelectField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import ReactSelect from '@e-group/material-module/ReactSelect';
import { Meta } from '@storybook/react';
import { store } from '../redux/immutable/configureStore';
import ReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';

export default {
  title: 'Components/ReactSelect',
  component: ReactSelect,
} as Meta;

export const WithReduxFormImmutableField: FC = () => {
  const initialValues = fromJS({
    field1: {
      label: 'I am label',
      value: 'value',
    },
    field2: {
      label: 'I am label',
      value: 'value',
    },
    field3: {
      label: 'I am label',
      value: 'value',
    },
    field4: [
      {
        label: 'label4',
        value: 'value2',
      },
      {
        label: 'label5',
        value: 'value3',
      },
    ],
    field5: [
      {
        label: 'label4',
        value: 'value2',
      },
      {
        label: 'label5',
        value: 'value3',
      },
    ],
    field6: 'value2',
    field7: ['value2', 'value3'],
  }) as any;
  const options = [
    {
      label: 'label',
      value: 'value2',
    },
    {
      label: 'label2',
      value: 'value3',
    },
    {
      label: 'label3',
      value: 'value4',
    },
    {
      label: 'label4',
      value: 'value5',
    },
    {
      label: 'label5',
      value: 'value6',
    },
  ];
  const [values, setValues] = useState(initialValues);
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={initialValues}>
            <Field
              name="field1"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
                helperText: 'customized helperText',
              }}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              name="field2"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Error Message',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
              }}
              meta={{
                invalid: true,
                touched: true,
                error: 'error message',
              }}
            />
            <Field
              variant="creatable"
              name="field3"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Creatable Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
              }}
            />
            <Field
              name="field4"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              MuiTextFieldProps={{
                label: 'Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
              }}
            />
            <Field
              variant="creatable"
              name="field5"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              MuiTextFieldProps={{
                label: 'Creatable Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
              }}
            />
            <Field
              name="field6"
              component={ReactSelectField}
              options={options}
              isClearable
              format={(value: any) => {
                if (typeof value === 'string') {
                  return fromJS({
                    label: value,
                    value,
                  });
                }
                return value;
              }}
              normalize={(value: any) => {
                if (isImmutable(value)) return value.get('value');
                return value;
              }}
              MuiTextFieldProps={{
                label: 'Normalize Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
              }}
            />
            <Field
              name="field7"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              format={(value: any) => {
                if (List.isList(value)) {
                  return value.map((el) =>
                    fromJS({
                      label: el,
                      value: el,
                    })
                  );
                }
                return value;
              }}
              normalize={(value: any) => {
                if (isImmutable(value)) {
                  return value.map((el) => (el as any).get('value'));
                }
                return value;
              }}
              MuiTextFieldProps={{
                label: 'Normalize Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
              }}
            />
          </ReduxForm>
        </Grid>
        <Grid item xs={6}>
          <Highlight
            code={JSON.stringify(values.toJS(), null, 4)}
            type="language-json"
          />
        </Grid>
      </Grid>
    </Provider>
  );
};
