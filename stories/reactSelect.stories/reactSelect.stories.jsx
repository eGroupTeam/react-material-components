import React from 'react';

import { isImmutable, List, fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import reactSelectMarkdownText from './reactSelect.md';

import { Provider } from 'react-redux';
import ReactSelect from '@e-group/material-module/ReactSelect';
import ReactSelectField from '@e-group/material-form/ReactSelectField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import { store } from '../redux/configureStore';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Option from './Option'

storiesOf('ReactSelect', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const variant = select('Variant', {
        standard: 'standard',
        filled: "filled",
        outlined: "outlined",
      }, 'standard');

      return (
        <React.Fragment>
          <ReactSelect
            isClearable
            MuiTextFieldProps={{
              label: 'Single Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            placeholder="Placeholder"
            options={[{
              label: 'I am label',
              value: 'value',
            }]}
          />
          <ReactSelect
            isClearable
            variant="creatable"
            MuiTextFieldProps={{
              label: 'Creatable Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            placeholder="Placeholder"
            options={[{
              label: 'I am label',
              value: 'value',
            }]}
          />
        </React.Fragment>
      )},
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with multi select',
    () => {
      const variant = select('Variant', {
        standard: 'standard',
        filled: "filled",
        outlined: "outlined",
      }, 'standard');

      return (
        <React.Fragment>
          <ReactSelect
            MuiTextFieldProps={{
              label: 'Multi Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            isMulti
            options={[{
              label: 'label',
              value: 'value2',
            },{
              label: 'label2',
              value: 'value3',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value4',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value5',
            }]}
          />
          <ReactSelect
            variant="creatable"
            MuiTextFieldProps={{
              label: 'Creatable Multi Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            isMulti
            options={[{
              label: 'label',
              value: 'value2',
            },{
              label: 'label2',
              value: 'value3',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value4',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value5',
            }]}
          />
        </React.Fragment>
      )
    },
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with default value',
    () => {
      const variant = select('Variant', {
        standard: 'standard',
        filled: "filled",
        outlined: "outlined",
      }, 'standard');

      return (
        <React.Fragment>
          <ReactSelect
            MuiTextFieldProps={{
              label: 'Single Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              margin: 'normal',
              variant
            }}
            value={{
              label: 'I am label',
              value: 'value',
            }}
          />
          <ReactSelect
            MuiTextFieldProps={{
              label: 'Multi Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            isMulti
            value={[{
              label: 'label4',
              value: 'value2',
            },{
              label: 'label5',
              value: 'value3',
            }]}
          />
        </React.Fragment>
      )
    },
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with customized Option',
    () => (
      <ReactSelect
        MuiTextFieldProps={{
          fullWidth: boolean('FullWidth', true),
          InputProps: {
            disableUnderline: boolean('DisableUnderline', false)
          }
        }}
        options={[{
          userName: 'userName',
          userOrganizationName: 'userOrganizationName',
          userPhone: 'userPhone',
          label: 'userName'
        }]}
        components={{
          Option
        }}
      />
    ),
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with field',
    () => {
      const initialValues = fromJS({
        field1: {
          label: 'I am label',
          value: 'value',
        },
        field2: {
          label: 'I am label',
          value: 'value',
        },
        field3: [{
          label: 'label4',
          value: 'value2',
        },{
          label: 'label5',
          value: 'value3',
        }],
        field4: [{
          label: 'label4',
          value: 'value2',
        },{
          label: 'label5',
          value: 'value3',
        }],
        field5: 'value2',
        field6: ['value2', 'value3'],
      })
      const options = [{
        label: 'label',
        value: 'value2',
      },{
        label: 'label2',
        value: 'value3',
      },{
        label: 'label3',
        value: 'value4',
      },{
        label: 'label4',
        value: 'value5',
      },{
        label: 'label5',
        value: 'value6',
      }]
      const Form = () => {
        const [values, setValues] = React.useState(initialValues);
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={initialValues}>
                <Field
                  name="field1"
                  component={ReactSelectField}
                  options={options}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Single Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal',
                  }}
                />
                <Field
                  variant="creatable"
                  name="field2"
                  component={ReactSelectField}
                  options={options}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Creatable Single Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal',
                  }}
                />
                <Field
                  name="field3"
                  component={ReactSelectField}
                  options={options}
                  isClearable
                  isMulti
                  MuiTextFieldProps={{
                    label: 'Multi Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    }
                  }}
                />
                <Field
                  variant="creatable"
                  name="field4"
                  component={ReactSelectField}
                  options={options}
                  isClearable
                  isMulti
                  MuiTextFieldProps={{
                    label: 'Creatable Multi Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    }
                  }}
                />
                <Field
                  name="field5"
                  component={ReactSelectField}
                  options={options}
                  isClearable
                  format={(value, name) => {
                    if (typeof value === "string") {
                      return fromJS({
                        label: value,
                        value
                      })
                    }
                    return value
                  }}
                  normalize={(value, name) => {
                    if (isImmutable(value)) return value.get("value")
                    return value
                  }}
                  MuiTextFieldProps={{
                    label: 'Normalize Single Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal',
                  }}
                />
                <Field
                  name="field6"
                  component={ReactSelectField}
                  options={options}
                  isClearable
                  isMulti
                  format={(value, name) => {
                    if (List.isList(value)) {
                      return value.map(el => fromJS({
                        label: el,
                        value: el
                      }))
                    }
                    return value
                  }}
                  normalize={(value, name) => {
                    if (isImmutable(value)) return value.map(el => el.get("value"))
                    return value
                  }}
                  MuiTextFieldProps={{
                    label: 'Normalize Multi Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal',
                  }}
                />
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={JSON.stringify(values.toJS(), null, 4)}
                type="language-json"
              />
            </Grid>
          </Grid>
        );
      };
      return <Form />;
    },
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )