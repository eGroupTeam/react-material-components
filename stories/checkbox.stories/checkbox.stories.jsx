import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form';
import { Field as ImmutableField } from 'redux-form/immutable';
import Checkbox from '@e-group/material/Checkbox';
import CheckboxField from '@e-group/material-form/CheckboxField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from '../redux/configureStore';
import { store as immutableStore } from '../redux/immutable/configureStore';
import checkboxMarkdownText from './checkbox.md';

storiesOf('Checkbox', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <Checkbox label="default" />, {
    notes: checkboxMarkdownText,
    info: {
      propTables: [Checkbox],
      propTablesExclude: [Provider]
    }
  })
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: true
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
                  component={CheckboxField}
                  label="checkbox with Field"
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
      notes: checkboxMarkdownText,
      info: {
        propTables: [Checkbox],
        propTablesExclude: [Provider]
      }
    }
  )
storiesOf('Checkbox', module)
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'with immutable Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: true
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <ImmutableField
                  name="field1"
                  component={CheckboxField}
                  label="checkbox with Field"
                />
              </ImmutableReduxForm>
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
      notes: checkboxMarkdownText,
      info: {
        propTables: [Checkbox],
        propTablesExclude: [Provider]
      }
    }
  );
