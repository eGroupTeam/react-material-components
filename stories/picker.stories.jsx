import React from 'react';
import { storiesOf } from '@storybook/react';

import { store } from './redux/configureStore';
import { fromJS } from 'immutable';
import MomentUtils from '@date-io/moment';

import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import PickerField from '@e-group/material-form/PickerField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import Highlight from './components/Highlight';
import ReduxForm from './components/ReduxForm';

storiesOf('Picker', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .addDecorator(story => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {story()}
    </MuiPickersUtilsProvider>
  ))
  .add(
    'default',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: new Date("2018-01-01T00:00:00.000Z"),
          field2: new Date("2018-01-01T00:00:00.000Z"),
          field3: new Date("2018-01-01T00:00:00.000Z"),
          field4: new Date("2018-01-01T00:00:00.000Z"),
          field5: new Date("2018-01-01T00:00:00.000Z"),
          field6: new Date("2018-01-01T00:00:00.000Z"),
        });
        const handleChange = values => {
          setValues({
            field1: values.get('field1'),
            field2: values.get('field2'),
            field3: values.get('field3'),
            field4: values.get('field4'),
            field5: values.get('field5'),
            field6: values.get('field6'),
          });
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  label="date picker"
                  name="field1"
                  margin="normal"
                  pickerFormat="YYYY-MM-DD"
                  component={PickerField}
                  fullWidth
                />
                <Field
                  label="keyboard date picker"
                  name="field2"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardDate"
                  pickerFormat="YYYY-MM-DD"
                  fullWidth
                />
                <Field
                  label="time picker"
                  name="field3"
                  margin="normal"
                  component={PickerField}
                  picker="time"
                  fullWidth
                />
                <Field
                  label="keyboard time picker"
                  name="field4"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardTime"
                  mask="__:__ _M"
                  fullWidth
                />
                <Field
                  label="datetime picker"
                  name="field5"
                  margin="normal"
                  component={PickerField}
                  picker="dateTime"
                  fullWidth
                />
                <Field
                  label="keyboard datetime picker"
                  name="field6"
                  ampm={false}
                  variant="inline"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardDateTime"
                  fullWidth
                  pickerFormat="YYYY/MM/DD HH:mm"
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
      info: {
        propTables: [PickerField]
      }
    }
  )