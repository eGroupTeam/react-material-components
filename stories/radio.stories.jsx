import React from 'react';
import { storiesOf } from '@storybook/react';
import { withStyles } from '@material-ui/core/styles';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import { Field } from 'redux-form/immutable';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Radio from '../src/Radio';
import RadioField from '../src/RadioField';

import checkboxMarkdownText from './doc/checkbox.md';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    color: green[600],
    '&$checked': {
      color: green[500]
    }
  },
  checked: {}
});

function RadioButtonsComponent({ classes }) {
  const [selectedValue, setSelectedValue] = React.useState('a');

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        name="RadioField"
        value="a"
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        name="RadioField"
        value="b"
      />
      <Radio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        name="RadioField"
        value="c"
        MuiRadioProps={{
          classes
        }}
      />
      <Radio
        checked={selectedValue === 'd'}
        onChange={handleChange}
        name="RadioField"
        value="d"
        MuiRadioProps={{
          color: 'default',
          icon: <RadioButtonUncheckedIcon fontSize="small" />,
          checkedIcon: <RadioButtonCheckedIcon fontSize="small" />
        }}
      />
    </div>
  );
}

const RadioButtons = withStyles(styles)(RadioButtonsComponent);

storiesOf('Radio', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('default', () => <RadioButtons />, {
    info: {
      text: checkboxMarkdownText,
      propTables: [Radio],
      propTablesExclude: [Provider]
    }
  })
  .add(
    'with Field',
    () => {
      const initialValues = fromJS({
        RadioField: 'b'
      });
      return (
        <ReduxForm initialValues={initialValues}>
          <Field
            name="RadioField"
            component={RadioField}
            label="radio with Field"
            radioValue="a"
          />
          <Field
            name="RadioField"
            component={RadioField}
            label="radio with Field checked"
            radioValue="b"
          />
        </ReduxForm>
      );
    },
    {
      info: {
        text: checkboxMarkdownText,
        propTables: [Radio],
        propTablesExclude: [Provider]
      }
    }
  );
