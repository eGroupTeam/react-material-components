import React from 'react';

import { isImmutable, List, fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import reactSelectMarkdownText from './reactSelect.md';

import { Provider } from 'react-redux';
import ReactSelect from '@e-group/material-module/ReactSelect';
import ReactSelectField from '@e-group/material-form/ReactSelectField';
import ImmutableReactSelectField from '@e-group/material-form/immutable/ReactSelectField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Field } from 'redux-form';
import { Field as ImmutableField } from 'redux-form/immutable';
import { store } from '../redux/configureStore';
import { store as immutableStore } from '../redux/immutable/configureStore';
import ReduxForm from '../components/ReduxForm';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';

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
    () => {
      
      const Option = props => {
        const { userName, userPhone, userOrganizationName } = props.data;
        return (
          <ListItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            button
            style={{
              fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
          >
            <ListItemText
              primary={userName}
              secondary={
                <React.Fragment>
                  <Typography component="span" color="textPrimary">
                    {userOrganizationName}
                  </Typography>
                  {' '}
                  {userPhone}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      }

      return (
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
    )},
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with dialog',
    () => {
      const options = [{
        label: 'I am label',
        value: 'value',
      },{
        label: 'I am label',
        value: 'value1',
      },{
        label: 'I am label',
        value: 'value2',
      },{
        label: 'I am label',
        value: 'value3',
      },{
        label: 'I am label',
        value: 'value4',
      },{
        label: 'I am label',
        value: 'value5',
      },{
        label: 'I am label',
        value: 'value6',
      }]
      return (
        <Dialog open>
          <DialogContent>
            <ReactSelect
              variant="creatable"
              isClearable
              placeholder="Placeholder"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              options={options}
              MuiTextFieldProps={{
                label: 'label',
                variant: 'outlined'
              }}
            />
            <Box height="100px"/>
            <ReactSelect
              variant="creatable"
              isClearable
              placeholder="Placeholder"
              menuPortalTarget={document.body}
              menuPosition="fixed"
              options={options}
              MuiTextFieldProps={{
                label: 'label',
                variant: 'outlined'
              }}
            />
            <Box height="500px"/>
            <ReactSelect
              isClearable
              placeholder="Placeholder"
              menuPortalTarget={document.body}
              menuPlacement="auto"
              menuPosition="fixed"
              options={options}
            />
          </DialogContent>
        </Dialog>
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
    'with field',
    () => {
      const initialValues = {
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
      }
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
                    helperText: "customized helperText"
                  }}
                />
                <Field
                  name="field1"
                  component={ReactSelectField}
                  options={options}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Error Message',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal'
                  }}
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'error message'
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
                      return {
                        label: value,
                        value
                      }
                    }
                    return value
                  }}
                  normalize={(value, name) => {
                    if (value) return value.value
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
                    if (Array.isArray(value)) {
                      return value.map(el => ({
                        label: el,
                        value: el
                      }))
                    }
                    return value
                  }}
                  normalize={(value, name) => {
                    if (value) return value.map(el => el.value)
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
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  
storiesOf('ReactSelect', module)
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'with immutable field',
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
              <ImmutableReduxForm onChange={handleChange} initialValues={initialValues}>
                <ImmutableField
                  name="field1"
                  component={ImmutableReactSelectField}
                  options={options}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Single Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal',
                    helperText: "customized helperText"
                  }}
                />
                <ImmutableField
                  name="field1"
                  component={ImmutableReactSelectField}
                  options={options}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Error Message',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal'
                  }}
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'error message'
                  }}
                />
                <ImmutableField
                  variant="creatable"
                  name="field2"
                  component={ImmutableReactSelectField}
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
                <ImmutableField
                  name="field3"
                  component={ImmutableReactSelectField}
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
                <ImmutableField
                  variant="creatable"
                  name="field4"
                  component={ImmutableReactSelectField}
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
                <ImmutableField
                  name="field5"
                  component={ImmutableReactSelectField}
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
                <ImmutableField
                  name="field6"
                  component={ImmutableReactSelectField}
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
              </ImmutableReduxForm>
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
