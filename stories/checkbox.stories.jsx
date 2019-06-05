import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import Checkbox from '@e-group/material/Checkbox';
import CheckboxField from '@e-group/material/CheckboxField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from './redux/configureStore';
import checkboxMarkdownText from './doc/checkbox.md';

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
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
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
  );
