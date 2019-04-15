import React from 'react';
import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import { Field } from 'redux-form/immutable';

import radioGroupText from './doc/radioGroup.md';
import RadioGroup from '../src/RadioGroup';
import RadioGroupField from '../src/RadioGroupField';

storiesOf('RadioGroup', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <RadioGroup
        margin="normal"
        fullWidth
        required
        label="default"
        options={[
          {
            value: '1',
            label: 'label1'
          },
          {
            value: '2',
            label: 'label2'
          },
          {
            value: '3',
            label: 'label3'
          }
        ]}
      />
    ),
    {
      info: {
        text: radioGroupText,
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with error helperText',
    () => (
      <RadioGroup
        label="with error"
        options={[
          {
            value: '1',
            label: 'label1'
          },
          {
            value: '2',
            label: 'label2'
          },
          {
            value: '3',
            label: 'label3'
          }
        ]}
        showHelperText
        error
        helperText="fill in this option is required!"
      />
    ),
    {
      info: {
        text: radioGroupText,
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const initialValues = fromJS({
        field1: '1'
      });
      return (
        <ReduxForm initialValues={initialValues}>
          <Field
            name="field1"
            component={RadioGroupField}
            margin="normal"
            fullWidth
            required
            label="with Field"
            options={[
              {
                value: '1',
                label: 'label1'
              },
              {
                value: '2',
                label: 'label2'
              },
              {
                value: '3',
                label: 'label3'
              }
            ]}
          />
        </ReduxForm>
      );
    },
    {
      info: {
        text: radioGroupText,
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  );
