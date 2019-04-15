import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import RadioGroup from '../src/RadioGroup';
import RadioGroupField from '../src/RadioGroupField';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import radioGroupText from './doc/radioGroup.md';

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
      notes: radioGroupText,
      info: {
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
      notes: radioGroupText,
      info: {
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: 'male',
          day: 'Monday'
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
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  required
                  label="gender"
                  options={[
                    {
                      value: 'male',
                      label: 'male'
                    },
                    {
                      value: 'female',
                      label: 'female'
                    }
                  ]}
                />
                <Field
                  name="day"
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  required
                  label="pick one day"
                  options={[
                    {
                      value: 'Monday',
                      label: 'Monday'
                    },
                    {
                      value: 'Tuesday',
                      label: 'Tuesday'
                    },
                    {
                      value: 'Wednesday',
                      label: 'Wednesday'
                    },
                    {
                      value: 'Thursday',
                      label: 'Thursday'
                    },
                    {
                      value: 'Friday',
                      label: 'Friday'
                    },
                    {
                      value: 'Saturday',
                      label: 'Saturday'
                    },
                    {
                      value: 'Sunday',
                      label: 'Sunday'
                    }
                  ]}
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
      notes: radioGroupText,
      info: {
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  );
