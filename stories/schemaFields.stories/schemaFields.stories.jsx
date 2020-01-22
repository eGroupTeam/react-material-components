import React from 'react';
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';

import { Field } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SchemaFields from '@e-group/material-form/SchemaFields';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';

storiesOf('SchemaFields', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({});
        const schema = React.useMemo(() => ({
          title: 'Material Ui Schema Fields',
          description: 'A simple example',
          type: 'object',
          required: ['field1', 'field2', 'field3', 'field5'],
          properties: {
            field1: {
              label: 'field1',
              name: 'field1',
              type: 'rating',
              options: [{
                value: 'option1',
                label: 'option1',
              }],
            },
            field2: {
              label: 'field2',
              name: 'field2',
              type: 'choiceone',
              options: [{
                value: 'option1',
                label: 'option1',
              }, {
                value: 'option2',
                label: 'option2',
              }]
            },
            field3: {
              label: 'field3',
              name: 'field3',
              type: 'choicemulti',
              options: [{
                name: 'option1',
                label: 'option1',
                toggleInput: true
              }, {
                name: 'option2',
                label: 'option2',
              }]
            },
            field4: {
              label: 'field4',
              name: 'field4',
              type: 'string'
            },
            field5: {
              label: 'field5',
              name: 'field5',
              type: 'boolean'
            }
          },
        }), [])
        const handleFieldError = React.useCallback(
          (value, allValues, formProps, name, properties) => `「${properties[name].label}」是必填欄位`,
          []
        );
        const handleChange = values => {
          setValues(values.toJS());
        };
        const handleSubmit = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onSubmit={handleSubmit} onChange={handleChange} initialValues={fromJS(values)}>
                <Typography variant="h6">Group 1</Typography>
                <SchemaFields
                  schema={schema}
                />
                <Typography variant="h6">Group 2</Typography>
                <SchemaFields
                  schema={schema}
                  isRequiredError={handleFieldError}
                  atLeastOneIsRequiredError={handleFieldError}
                  renderField={(fieldProps, {
                    schema, key, index
                  }) => (
                    <div key={key}>
                      # {index}
                      <Field
                        margin="normal"
                        fullWidth
                        {...fieldProps}
                      />
                    </div>
                  )}
                />
                <button type="submit">Submit</button>
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
