import React from 'react';
import { storiesOf } from '@storybook/react';

import { store } from '../redux/configureStore';
import { fromJS } from 'immutable';
import MomentUtils from '@date-io/moment';

import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import PickerField from '@e-group/material-form/PickerField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/ReduxForm';

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
        const [values, setValues] = React.useState(fromJS({
          field1: "2019-01-20",
          field2: "2019-01-20",
          field3: "2019-01-20",
          field4: "2019-01-20",
          field5: "2019-01-20",
          field6: "2019-01-20",
          field7: "2019-01-20",
          field8: "2019-01-20",
        }));
        const handleChange = values => {
          setValues(values);
        };
        const handleSubmit = (values) => {
          console.log(values.toJS())
        }
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onSubmit={handleSubmit} onChange={handleChange} initialValues={values}>
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
                <Field
                  label="With min and max"
                  name="field7"
                  helperText="With min and max"
                  margin="normal"
                  component={PickerField}
                  minDate={new Date("2018-03-01")}
                  maxDate={new Date("2018-06-01")}
                  pickerFormat="YYYY-MM-DD"
                  fullWidth
                />
                <Field
                  label="Year only"
                  name="field8"
                  views={["year"]}
                  variant="inline"
                  margin="normal"
                  component={PickerField}
                  fullWidth
                />
                <button type="submit">submit</button>
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