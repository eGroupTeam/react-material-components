import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import ImmutableJsReduxForm from '../components/ImmutableJsReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form';
import { Field as ImmutableJsField } from 'redux-form/immutable';
import CheckboxInputGroup from '@e-group/material/CheckboxInputGroup';
import CheckboxInputGroupField from '@e-group/material-form/CheckboxInputGroupField';
import ImmutableJsCheckboxInputGroupField from '@e-group/material-form/immutable/CheckboxInputGroupField';

import { fromJS } from 'immutable';
import { immutableJsStore } from '../redux/immutableJsConfigureStore';
import { store } from '../redux/configureStore';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import checkboxInputGroupText from './checkboxInputGroup.md';

storiesOf('CheckboxInputGroup', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const isError = boolean('Error', false)
      const helperText = text('Helper Text', 'fill in this option is required!')
      return (
        <CheckboxInputGroup
          label="default"
          options={[
            {
              key: "checkbox1",
              name: 'checkbox1',
              label: 'normal checkbox',
              MuiCheckboxProps: {
                color: 'primary'
              }
            },
            {
              key: "checkbox2",
              name: 'checkbox2',
              label: 'checked with text input',
              MuiCheckboxProps: {
                color: 'primary'
              },
              toggleInput: true
            },
            {
              key: "checkbox3",
              name: 'checkbox3',
              label: 'checked with text input',
              toggleInput: true
            }
          ]}
          margin="normal"
          fullWidth
          required
          error={isError}
          helperText={helperText}
        />
      )
    },
    {
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: {
            checkbox2: {
              checked: true,
              text: 'awesome!'
            }
          },
          field2: {
            Monday: {
              checked: true
            },
            Tuesday: {
              checked: true
            }
          }
        });
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={values}>
                <Field
                  name="field1"
                  label="with Field"
                  component={CheckboxInputGroupField}
                  helperText="please select items"
                  fullWidth
                  margin="normal"
                  options={[
                    {
                      key: "checkbox1",
                      name: 'checkbox1',
                      label: 'normal checkbox',
                      MuiCheckboxProps: {
                        color: 'primary'
                      }
                    },
                    {
                      key: "checkbox2",
                      name: 'checkbox2',
                      label: 'checked with text input',
                      MuiCheckboxProps: {
                        color: 'primary'
                      },
                      toggleInput: true
                    },
                    {
                      key: "checkbox3",
                      name: 'checkbox3',
                      label: 'checked with text input',
                      toggleInput: true
                    }
                  ]}
                />
                <Field
                  name="field2"
                  label="with Field"
                  component={CheckboxInputGroupField}
                  fullWidth
                  margin="normal"
                  options={[
                    {
                      key: "Monday",
                      name: 'Monday',
                      label: 'Monday'
                    },
                    {
                      key: "Tuesday",
                      name: 'Tuesday',
                      label: 'Tuesday'
                    },
                    {
                      key: "Wednesday",
                      name: 'Wednesday',
                      label: 'Wednesday'
                    },
                    {
                      key: "Thursday",
                      name: 'Thursday',
                      label: 'Thursday'
                    },
                    {
                      key: "Friday",
                      name: 'Friday',
                      label: 'Friday'
                    },
                    {
                      key: "Saturday",
                      name: 'Saturday',
                      label: 'Saturday'
                    },
                    {
                      key: "Sunday",
                      name: 'Sunday',
                      label: 'Sunday'
                    }
                  ]}
                />
                <Field
                  name="field3"
                  label="with Field"
                  component={CheckboxInputGroupField}
                  helperText="please select items"
                  fullWidth
                  margin="normal"
                  options={[
                    {
                      key: "checkbox1",
                      name: 'checkbox1',
                      label: 'normal checkbox',
                      MuiCheckboxProps: {
                        color: 'primary'
                      }
                    },
                    {
                      key: "checkbox2",
                      name: 'checkbox2',
                      label: 'checked with text input',
                      MuiCheckboxProps: {
                        color: 'primary'
                      },
                      toggleInput: true
                    },
                    {
                      key: "checkbox3",
                      name: 'checkbox3',
                      label: 'checked with text input',
                      toggleInput: true
                    }
                  ]}
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'fill in this option is required!'
                  }}
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
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  );

storiesOf('CheckboxInputGroup', module)
  .addDecorator(story => <Provider store={immutableJsStore}>{story()}</Provider>)
  .add(
    'with ImmutableJS Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: {
            checkbox2: {
              checked: true,
              text: 'awesome!'
            }
          },
          field2: {
            Monday: {
              checked: true
            },
            Tuesday: {
              checked: true
            }
          }
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableJsReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <ImmutableJsField
                  name="field1"
                  label="with Field"
                  component={ImmutableJsCheckboxInputGroupField}
                  helperText="please select items"
                  fullWidth
                  margin="normal"
                  options={[
                    {
                      key: "checkbox1",
                      name: 'checkbox1',
                      label: 'normal checkbox',
                      MuiCheckboxProps: {
                        color: 'primary'
                      }
                    },
                    {
                      key: "checkbox2",
                      name: 'checkbox2',
                      label: 'checked with text input',
                      MuiCheckboxProps: {
                        color: 'primary'
                      },
                      toggleInput: true
                    },
                    {
                      key: "checkbox3",
                      name: 'checkbox3',
                      label: 'checked with text input',
                      toggleInput: true
                    }
                  ]}
                />
                <ImmutableJsField
                  name="field2"
                  label="with Field"
                  component={ImmutableJsCheckboxInputGroupField}
                  fullWidth
                  margin="normal"
                  options={[
                    {
                      key: "Monday",
                      name: 'Monday',
                      label: 'Monday'
                    },
                    {
                      key: "Tuesday",
                      name: 'Tuesday',
                      label: 'Tuesday'
                    },
                    {
                      key: "Wednesday",
                      name: 'Wednesday',
                      label: 'Wednesday'
                    },
                    {
                      key: "Thursday",
                      name: 'Thursday',
                      label: 'Thursday'
                    },
                    {
                      key: "Friday",
                      name: 'Friday',
                      label: 'Friday'
                    },
                    {
                      key: "Saturday",
                      name: 'Saturday',
                      label: 'Saturday'
                    },
                    {
                      key: "Sunday",
                      name: 'Sunday',
                      label: 'Sunday'
                    }
                  ]}
                />
                <ImmutableJsField
                  name="field3"
                  label="with Field"
                  component={ImmutableJsCheckboxInputGroupField}
                  helperText="please select items"
                  fullWidth
                  margin="normal"
                  options={[
                    {
                      key: "checkbox1",
                      name: 'checkbox1',
                      label: 'normal checkbox',
                      MuiCheckboxProps: {
                        color: 'primary'
                      }
                    },
                    {
                      key: "checkbox2",
                      name: 'checkbox2',
                      label: 'checked with text input',
                      MuiCheckboxProps: {
                        color: 'primary'
                      },
                      toggleInput: true
                    },
                    {
                      key: "checkbox3",
                      name: 'checkbox3',
                      label: 'checked with text input',
                      toggleInput: true
                    }
                  ]}
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'fill in this option is required!'
                  }}
                />
              </ImmutableJsReduxForm>
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
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  );
