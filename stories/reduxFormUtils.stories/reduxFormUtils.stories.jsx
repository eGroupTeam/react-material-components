import React from 'react';

import { fromJS } from '@e-group/immutable';
import { storiesOf } from '@storybook/react';
import {
  makeReactSelectFormatter,
  makeReactSelectNormalizer,
  parseReactSelectOptions,
} from '@e-group/utils/immutable/reduxFormUtils';

import { Provider } from 'react-redux';
import { Field } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import ReactSelectField from '@e-group/material-form/immutable/ReactSelectField';
import { store } from '../redux/immutable/configureStore';
import ReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';

export const options = [
  {
    label: 'value',
    value: 'value',
  },
  {
    label: 'value2',
    value: 'value2',
  },
];

export const options2 = [
  {
    label: 'label',
    value: 'value',
  },
  {
    label: 'label2',
    value: 'value2',
  },
];

export const options3 = [
  {
    userName: 'userName',
    userId: 'userId',
  },
  {
    userName: 'userName2',
    userId: 'userId2',
  },
];

const Demo = () => {
  const [values, setValues] = React.useState({
    field1: 'value',
    field2: 'value',
    field3: {
      userName: 'userName',
      userId: 'userId',
    },
    field4: ['value'],
    field5: ['value'],
    field6: [
      {
        userName: 'userName2',
        userId: 'userId2',
      },
    ],
  });

  const handleChange = (values) => {
    setValues(values.toJS());
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
          <Field
            name="field1"
            component={ReactSelectField}
            format={makeReactSelectFormatter()}
            normalize={makeReactSelectNormalizer()}
            options={options}
            MuiTextFieldProps={{
              label: 'label & value are the same string',
              margin: 'normal',
              fullWidth: true,
            }}
          />
          <Field
            name="field2"
            component={ReactSelectField}
            format={makeReactSelectFormatter({ options: options2 })}
            normalize={makeReactSelectNormalizer()}
            options={options2}
            MuiTextFieldProps={{
              label: 'label & value are different string',
              margin: 'normal',
              fullWidth: true,
            }}
          />
          <Field
            name="field3"
            component={ReactSelectField}
            format={makeReactSelectFormatter({
              labelPath: ['userName'],
              valuePath: ['userId'],
            })}
            normalize={makeReactSelectNormalizer({
              disableReturnStringValue: true,
            })}
            options={parseReactSelectOptions({
              labelPath: ['userName'],
              valuePath: ['userId'],
              options: options3,
            })}
            MuiTextFieldProps={{
              label: 'without label & value attribute',
              margin: 'normal',
              fullWidth: true,
            }}
          />
          <Field
            name="field4"
            component={ReactSelectField}
            format={makeReactSelectFormatter()}
            normalize={makeReactSelectNormalizer()}
            options={options}
            MuiTextFieldProps={{
              label: 'label & value are the same string',
              margin: 'normal',
              fullWidth: true,
            }}
            isMulti
            type="select-multiple"
          />
          <Field
            name="field5"
            component={ReactSelectField}
            format={makeReactSelectFormatter({ options: options2 })}
            normalize={makeReactSelectNormalizer()}
            options={options2}
            MuiTextFieldProps={{
              label: 'label & value are different string',
              margin: 'normal',
              fullWidth: true,
            }}
            isMulti
            type="select-multiple"
          />
          <Field
            name="field6"
            component={ReactSelectField}
            format={makeReactSelectFormatter({
              labelPath: ['userName'],
              valuePath: ['userId'],
            })}
            normalize={makeReactSelectNormalizer({
              disableReturnStringValue: true,
            })}
            options={parseReactSelectOptions({
              labelPath: ['userName'],
              valuePath: ['userId'],
              options: options3,
            })}
            MuiTextFieldProps={{
              label: 'without label & value attribute',
              margin: 'normal',
              fullWidth: true,
            }}
            isMulti
            type="select-multiple"
          />
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

storiesOf('reduxFormUtils', module)
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <Demo />);
