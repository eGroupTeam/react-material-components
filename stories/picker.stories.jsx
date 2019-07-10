import React from 'react';
import { storiesOf } from '@storybook/react';

import { store } from './redux/configureStore';
import { fromJS } from 'immutable';
import moment from 'moment';
import MomentUtils from '@date-io/moment';

import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import PickerField from '@e-group/material-form/PickerField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import Highlight from './components/Highlight';
import ReduxForm from './components/ReduxForm';

moment.lang("zh-tw")

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
          field1: moment(new Date()),
          field2: moment(new Date()),
          field3: moment(new Date()),
        });
        const handleChange = values => {
          setValues({
            field1: values.get('field1').format('YYYY-MM-DD'),
            field2: values.get('field2'),
            field3: values.get('field3'),
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
                  datePickerFormat="YYYY-MM-DD"
                  component={PickerField}
                  fullWidth
                />
                <Field
                  label="time picker"
                  name="field2"
                  margin="normal"
                  component={PickerField}
                  variant="time"
                  fullWidth
                />
                <Field
                  label="datetime picker"
                  name="field3"
                  margin="normal"
                  component={PickerField}
                  variant="dateTime"
                  fullWidth
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