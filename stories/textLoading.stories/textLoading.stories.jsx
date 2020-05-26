import React from 'react';
import { Provider } from 'react-redux';
import ImmutableJsReduxForm from '../components/ImmutableJsReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import TextLoading from '@e-group/material/TextLoading';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextLoadingField from '@e-group/material-form/TextLoadingField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { immutableJsStore } from '../redux/immutableJsConfigureStore';
import textLoadingMarkdownText from './textLoading.md';

storiesOf('TextLoading', module)
  .addDecorator(story => <Provider store={immutableJsStore}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <TextLoading
        loading
        label="default"
        fullWidth
        helperText="account is validating..."
        margin="normal"
        required
      />
    ),
    {
      notes: textLoadingMarkdownText,
      info: {
        propTables: [TextLoading],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with customized loadingAdornment',
    () => (
      <TextLoading
        label="with customized loadingAdornment"
        fullWidth
        loading
        loadingAdornment={
          <InputAdornment position="end">
            <CircularProgress color="secondary" size={20} />
          </InputAdornment>
        }
        helperText="If set loading=`true` the endAdornment will be replaced by loadingAdornment"
        margin="normal"
        InputProps={{
          endAdornment: <InputAdornment position="end">Kg</InputAdornment>
        }}
        required
      />
    ),
    {
      notes: textLoadingMarkdownText,
      info: {
        propTables: [TextLoading],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with select',
    () => {
      const ControlledTextLoading = () => {
        const [value, setValue] = React.useState('option1');
        const handleChange = e => {
          setValue(e.target.value);
        };
        return (
          <TextLoading
            label="with Select"
            fullWidth
            loading
            value={value}
            select={true}
            margin="normal"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Kg</InputAdornment>
              )
            }}
            required
          >
            <MenuItem value="option1">option1</MenuItem>
            <MenuItem value="option2">option2</MenuItem>
          </TextLoading>
        );
      };
      return <ControlledTextLoading />;
    },
    {
      notes: textLoadingMarkdownText,
      info: {
        propTables: [TextLoading],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: 'admin@gmail.com'
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableJsReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  label="default"
                  name="field1"
                  margin="normal"
                  component={TextLoadingField}
                  fullWidth
                />
                <Field
                  label="loading"
                  name="field2"
                  margin="normal"
                  component={TextLoadingField}
                  fullWidth
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{ asyncValidating: true }}
                />
                <Field
                  label="error"
                  name="field3"
                  margin="normal"
                  required
                  component={TextLoadingField}
                  fullWidth
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'error message'
                  }}
                />
                <Field
                  label="select"
                  name="field4"
                  fullWidth
                  loading
                  component={TextLoadingField}
                  select={true}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Kg</InputAdornment>
                    )
                  }}
                  required
                >
                  <MenuItem value="option1">option1</MenuItem>
                  <MenuItem value="option2">option2</MenuItem>
                </Field>
                <Field
                  label="multiple select"
                  name="field5"
                  SelectProps={{
                    multiple: true
                  }}
                  fullWidth
                  loading
                  component={TextLoadingField}
                  select={true}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Kg</InputAdornment>
                    )
                  }}
                  required
                >
                  <MenuItem value="option1">option1</MenuItem>
                  <MenuItem value="option2">option2</MenuItem>
                </Field>
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
      notes: textLoadingMarkdownText,
      info: {
        propTables: [TextLoading],
        propTablesExclude: [Provider]
      }
    }
  );
