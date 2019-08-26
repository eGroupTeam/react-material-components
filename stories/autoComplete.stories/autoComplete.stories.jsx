import React from 'react';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import autoCompleteMarkdownText from './autoComplete.md';

import { Provider } from 'react-redux';
import AutoComplete from '@e-group/material-module/AutoComplete';
import AutoCompleteField from '@e-group/material-form/AutoCompleteField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import { store } from '../redux/configureStore';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Option from './Option'

storiesOf('AutoComplete', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <AutoComplete
        MuiTextFieldProps={{
          label: 'Single Select',
          fullWidth: boolean('FullWidth', true),
          InputProps: {
            disableUnderline: boolean('DisableUnderline', false)
          }
        }}
        value={{
          label: 'I am label',
          value: 'value',
        }}
        options={[{
          label: 'I am label',
          value: 'value',
        }]}
        placeholder="Search"
      />
    ),
    {
      notes: autoCompleteMarkdownText,
      info: {
        propTables: [AutoComplete]
      }
    }
  )
  .add(
    'with multi select',
    () => (
      <AutoComplete
        MuiTextFieldProps={{
          label: 'Multi Select',
          fullWidth: boolean('FullWidth', true),
          InputProps: {
            disableUnderline: boolean('DisableUnderline', false)
          }
        }}
        isMulti
        value={[{
          label: 'label4',
          value: 'value2',
        },{
          label: 'label5',
          value: 'value3',
        }]}
        options={[{
          label: 'label',
          value: 'value2',
        },{
          label: 'label2',
          value: 'value3',
        }]}
        placeholder="Search"
      />
    ),
    {
      notes: autoCompleteMarkdownText,
      info: {
        propTables: [AutoComplete]
      }
    }
  )
  .add(
    'with customized Option',
    () => (
      <AutoComplete
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
        placeholder="Search"
      />
    ),
    {
      notes: autoCompleteMarkdownText,
      info: {
        propTables: [AutoComplete]
      }
    }
  )
  .add(
    'with field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: {
            label: 'I am label',
            value: 'value',
          },
          field2: [{
            label: 'label4',
            value: 'value2',
          },{
            label: 'label5',
            value: 'value3',
          }]
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  name="field1"
                  label="with Field"
                  component={AutoCompleteField}
                  options={[{
                    label: 'label',
                    value: 'value2',
                  }]}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Single Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    }
                  }}
                />
                <Field
                  name="field2"
                  label="with Field"
                  component={AutoCompleteField}
                  options={[{
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
                  }]}
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
      notes: autoCompleteMarkdownText,
      info: {
        propTables: [AutoComplete]
      }
    }
  )
