import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import TextLoading from '../src/TextLoading';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextLoadingField from '../src/TextLoadingField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from './redux/configureStore';
import textLoadingMarkdownText from './doc/textLoading.md';

storiesOf('TextLoading', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <TextLoading
        loading
        label="default"
        fullWidth
        helperText="account is validating..."
        margin="normal"
        value="admin@gmail.com"
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
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  label="with Field"
                  name="field1"
                  margin="normal"
                  component={TextLoadingField}
                  fullWidth
                />
                <Field
                  label="with loading"
                  name="field2"
                  margin="normal"
                  component={TextLoadingField}
                  fullWidth
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{ asyncValidating: true }}
                />
                <Field
                  label="with loading"
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
      notes: textLoadingMarkdownText,
      info: {
        propTables: [TextLoading],
        propTablesExclude: [Provider]
      }
    }
  );
