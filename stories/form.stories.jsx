import React from 'react';
import { Provider } from 'react-redux';
import { Field } from 'redux-form/immutable';
import { storiesOf } from '@storybook/react';
import { Button } from '@material-ui/core';
import { TextField, SelectField } from '../src';

import ReduxForm from './components/ReduxForm';

import { store } from './redux/configureStore';

const initialValues = {
  SelectField: 0
};

storiesOf('Form', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Basic Field components', () => (
    <React.Fragment>
      <ReduxForm initialValues={initialValues}>
        <Field
          name="TextField"
          label="TextField"
          component={TextField}
          fullWidth
          margin="normal"
          required
        />
        <Field
          name="TextField2"
          label="TextField2"
          component={TextField}
          fullWidth
          margin="normal"
          required
          meta={{ asyncValidating: true }}
        />
        <Field
          name="TextField2"
          label="TextField2"
          component={TextField}
          fullWidth
          margin="normal"
          required
          /* Pass meta props cause the failed prop type and don't worry it's just for demo */
          meta={{ invalid: true, touched: true, error: 'error' }}
        />
        <Field
          name="SelectField"
          label="SelectField"
          component={SelectField}
          fullWidth
          margin="normal"
          options={[
            { text: 'cam 1', value: 0 },
            { text: 'cam 2', value: 1 },
            { text: 'cam 3', value: 2 },
            { text: 'cam 4', value: 3 }
          ]}
          required
        />
        <Field
          name="SelectField2"
          label="SelectField2"
          component={SelectField}
          fullWidth
          margin="normal"
          options={[
            { text: 'cam 1', value: 0 },
            { text: 'cam 2', value: 1 },
            { text: 'cam 3', value: 2 },
            { text: 'cam 4', value: 3 }
          ]}
          required
          /* Pass meta props cause the failed prop type and don't worry it's just for demo */
          meta={{ invalid: true, touched: true, error: 'error' }}
        />
        <Button fullWidth variant="contained" style={{ marginRight: '10px' }}>
          Submit
        </Button>
        <Button variant="contained" style={{ marginRight: '10px' }}>
          Button
        </Button>
      </ReduxForm>
    </React.Fragment>
  ));
