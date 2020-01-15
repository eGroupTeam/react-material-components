import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';

import Grid from '@material-ui/core/Grid';
import SchemaFields from '@e-group/material-form/SchemaFields';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';

storiesOf('SchemaFields', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const fields = [{
        label: 'field1',
        name: 'field1',
        type: 'rating',
        required: true,
        options: [{
          value: 'option1',
          label: 'option1',
        }],
      }, {
        label: 'field2',
        name: 'field2',
        type: 'choiceone',
        required: true,
        options: [{
          value: 'option1',
          label: 'option1',
        }, {
          value: 'option2',
          label: 'option2',
        }]
      }, {
        label: 'field3',
        name: 'field3',
        type: 'choicemulti',
        required: true,
        options: [{
          name: 'option1',
          label: 'option1',
          toggleInput: true
        }, {
          name: 'option2',
          label: 'option2',
        }]
      }, {
        label: 'field4',
        name: 'field4',
        required: true,
        type: 'text'
      }, {
        label: 'field5',
        name: 'field5',
        required: true,
        type: 'boolean'
      }]
      const Form = () => {
        const [values, setValues] = React.useState({});
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <SchemaFields schema={{
                  fields,
                  
                }} />
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
    }
  )
