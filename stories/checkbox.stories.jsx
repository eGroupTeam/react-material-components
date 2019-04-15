import React from 'react';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import { Field } from 'redux-form/immutable';
import Checkbox from '../src/Checkbox';
import CheckboxField from '../src/CheckboxField';

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
          CheckboxField: true
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <React.Fragment>
            <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
              <Field
                name="CheckboxField"
                component={CheckboxField}
                label="checkbox with Field"
              />
            </ReduxForm>
            <Highlight
              code={JSON.stringify(values, null, 4)}
              type="language-json"
            />
          </React.Fragment>
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
