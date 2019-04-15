import React from 'react';
import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import RadioButtons from './components/RadioButtons';
import { Field } from 'redux-form/immutable';
import Radio from '../src/Radio';
import RadioField from '../src/RadioField';

import radioMarkdownText from './doc/radio.md';

storiesOf('Radio', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <RadioButtons />, {
    notes: radioMarkdownText,
    info: {
      propTables: [Radio],
      propTablesExclude: [Provider]
    }
  })
  .add(
    'with Field',
    () => {
      const initialValues = fromJS({
        RadioField: 'b'
      });
      return (
        <ReduxForm initialValues={initialValues}>
          <Field
            name="RadioField"
            component={RadioField}
            label="radio with Field"
            radioValue="a"
          />
          <Field
            name="RadioField"
            component={RadioField}
            label="radio with Field checked"
            radioValue="b"
          />
        </ReduxForm>
      );
    },
    {
      notes: radioMarkdownText,
      info: {
        propTables: [Radio],
        propTablesExclude: [Provider]
      }
    }
  );
