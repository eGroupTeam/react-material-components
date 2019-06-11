import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import RadioButtons from './components/RadioButtons';
import Highlight from './components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import Radio from '@e-group/material/Radio';
import RadioField from '@e-group/material/RadioField';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import radioMarkdownText from './doc/radio.md';

storiesOf('Radio', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const Demo = () => <RadioButtons />;
      return <Demo />;
    },
    {
      notes: radioMarkdownText,
      info: {
        propTables: [Radio],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: 'male'
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  name="gender"
                  component={RadioField}
                  label="male"
                  radioValue="male"
                />
                <Field
                  name="gender"
                  component={RadioField}
                  label="female"
                  radioValue="female"
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
      return <Form />;
    },
    {
      notes: radioMarkdownText,
      info: {
        propTables: [Radio],
        propTablesExclude: [Provider]
      }
    }
  );
