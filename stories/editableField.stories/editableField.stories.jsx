import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { submit, hasSubmitSucceeded, formValueSelector, reset } from 'redux-form/immutable'
import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from '../redux/configureStore';

import { Provider } from 'react-redux';
import { Field } from 'redux-form/immutable'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import FormFieldGroup from '@e-group/material-lab/FormFieldGroup';
import EditableField from '@e-group/material-lab/EditableField';
import EditableFieldShowing from '@e-group/material-lab/EditableFieldShowing';
import TextLoadingField from '@e-group/material-form/TextLoadingField';
import ReduxForm, { FORM } from '../components/ReduxForm';
import Highlight from '../components/Highlight';

const stories = storiesOf('EditableField', module);

const Demo = (props) => {
  const [text, setText] = React.useState("Click here to start editing")
  const handleChange = e => {
    setText(e.target.value)
  }
  const handleSave = (e, { closeEditing }) => {
    closeEditing()
  }
  return (
    <EditableField onSaveClick={handleSave} {...props}>
      <EditableFieldShowing>
        <Typography variant="body1">
          {text}
        </Typography>
      </EditableFieldShowing>
      <TextField label="editing field" value={text} onChange={handleChange} fullWidth/>
    </EditableField>
  );
}

stories.addDecorator(story => <Provider store={store}>{story()}</Provider>).add(
  'default',
  () => {
    return (<Demo />);
  },
  {
    info: {
      propTables: [EditableField]
    }
  }
)

stories.add(
  'with FormFieldGroup',
  () => {
    return (<FormFieldGroup required label="Field 1"><Demo style={{ marginLeft: -8 }} /></FormFieldGroup>);
  },
  {
    info: {
      propTables: [EditableField]
    }
  }
)

const selector = formValueSelector(FORM);

stories.add(
  'with redux form',
  () => {
    const FormDemo = () => {
      const [afterSubmitActions, setAfterSubmitActions] = React.useState();
      const [values, setValues] = React.useState({
        field1: 'field1',
        field2: 'field2',
        field3: 'field3',
      });
      const field1 = useSelector(state => selector(state, "field1"));
      const field2 = useSelector(state => selector(state, "field2"));
      const field3 = useSelector(state => selector(state, "field3"));
      const submitSucceeded = useSelector(state => hasSubmitSucceeded(FORM)(state));
      const dispatch = useDispatch()

      React.useEffect(() => {
        if (submitSucceeded && afterSubmitActions) {
          afterSubmitActions.closeEditing();
        }
      }, [afterSubmitActions, submitSucceeded]);

      const handleSave = (e, { closeEditing }) => {
        dispatch(submit(FORM))
        setAfterSubmitActions({
          closeEditing
        });
      }

      const handleClose = () => {
        console.log("handleClose")
        dispatch(reset(FORM));
      };

      const handleChange = values => {
        setValues(values.toJS());
      };

      const handleSubmit = (values) => {
        console.log(values.toJS())
      }

      return (
        <Grid container>
          <Grid item xs={6}>
            <ReduxForm onChange={handleChange} onSubmit={handleSubmit} initialValues={fromJS(values)}>
              <FormFieldGroup required label="Field 1">
                <EditableField onSaveClick={handleSave} onCloseClick={handleClose} disableClickAwayCloseEditing style={{ marginLeft: -8 }}>
                  <EditableFieldShowing>
                    <Typography variant="body1">
                      {field1}
                    </Typography>
                  </EditableFieldShowing>
                  <Field
                    label="editing field"
                    name="field1"
                    margin="normal"
                    component={TextLoadingField}
                    fullWidth
                  />
                </EditableField>
                <EditableField onSaveClick={handleSave} onCloseClick={handleClose} disableClickAwayCloseEditing style={{ marginLeft: -8 }}>
                  <EditableFieldShowing>
                    <Typography variant="body1">
                      {field2}
                    </Typography>
                  </EditableFieldShowing>
                  <Field
                    label="editing field2"
                    name="field2"
                    margin="normal"
                    component={TextLoadingField}
                    fullWidth
                  />
                </EditableField>
                <EditableField onSaveClick={handleSave} onCloseClick={handleClose} disableClickAwayCloseEditing style={{ marginLeft: -8 }}>
                  <EditableFieldShowing>
                    <Typography variant="body1">
                      {field3}
                    </Typography>
                  </EditableFieldShowing>
                  <Field
                    label="editing field3"
                    name="field3"
                    margin="normal"
                    component={TextLoadingField}
                    fullWidth
                  />
                </EditableField>
              </FormFieldGroup>
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
    }
    return (<FormDemo />);
  },
  {
    info: {
      propTables: [EditableField]
    }
  }
)