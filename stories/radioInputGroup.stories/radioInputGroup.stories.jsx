import React from 'react';
import { Provider } from 'react-redux';
// import ReduxForm from '../components/ReduxForm';
// import Highlight from '../components/Highlight';
// import Grid from '@material-ui/core/Grid';
// import { Field } from 'redux-form/immutable';
import RadioInputGroup from '@e-group/material/RadioInputGroup';
// import RadioInputGroupField from '@e-group/material-form/RadioInputGroupField';

// import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import notes from './radioInputGroup.md';

storiesOf('RadioInputGroup', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const isError = boolean('Error', false)
      const helperText = text('Helper Text', 'fill in this option is required!')
      return (
        <RadioInputGroup
          margin="normal"
          fullWidth
          required
          label="default"
          error={isError}
          helperText={helperText}
          options={[
            {
              key: "radio1",
              value: '1',
              label: 'normal radio',
              MuiRadioProps: {
                color: 'primary'
              }
            },
            {
              key: "radio2",
              value: '2',
              label: 'checked with text input',
              MuiRadioProps: {
                color: 'primary'
              },
              toggleInput: true
            },
            {
              key: "radio3",
              value: '3',
              label: 'checked with text input',
              toggleInput: true
            }
          ]}
        />
      )
    },
    {
      notes,
      info: {
        propTables: [RadioInputGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  // .add(
  //   'with Field',
  //   () => {
  //     const Form = () => {
  //       const [values, setValues] = React.useState({
  //         field1: {
  //           radio2: {
  //             checked: true,
  //             text: 'awesome!'
  //           }
  //         },
  //         field2: {
  //           Monday: {
  //             checked: true
  //           },
  //           Tuesday: {
  //             checked: true
  //           }
  //         }
  //       });
  //       const handleChange = values => {
  //         setValues(values.toJS());
  //       };
  //       return (
  //         <Grid container>
  //           <Grid item xs={6}>
  //             <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
  //               <Field
  //                 name="field1"
  //                 label="with Field"
  //                 component={RadioInputGroupField}
  //                 helperText="please select items"
  //                 fullWidth
  //                 margin="normal"
  //                 options={[
  //                   {
  //                     key: "radio1",
  //                     name: 'radio1',
  //                     label: 'normal radio',
  //                     MuiRadioProps: {
  //                       color: 'primary'
  //                     }
  //                   },
  //                   {
  //                     key: "radio2",
  //                     name: 'radio2',
  //                     label: 'checked with text input',
  //                     MuiRadioProps: {
  //                       color: 'primary'
  //                     },
  //                     toggleInput: true
  //                   },
  //                   {
  //                     key: "radio3",
  //                     name: 'radio3',
  //                     label: 'checked with text input',
  //                     toggleInput: true
  //                   }
  //                 ]}
  //               />
  //               <Field
  //                 name="field2"
  //                 label="with Field"
  //                 component={RadioInputGroupField}
  //                 fullWidth
  //                 margin="normal"
  //                 options={[
  //                   {
  //                     key: "Monday",
  //                     name: 'Monday',
  //                     label: 'Monday'
  //                   },
  //                   {
  //                     key: "Tuesday",
  //                     name: 'Tuesday',
  //                     label: 'Tuesday'
  //                   },
  //                   {
  //                     key: "Wednesday",
  //                     name: 'Wednesday',
  //                     label: 'Wednesday'
  //                   },
  //                   {
  //                     key: "Thursday",
  //                     name: 'Thursday',
  //                     label: 'Thursday'
  //                   },
  //                   {
  //                     key: "Friday",
  //                     name: 'Friday',
  //                     label: 'Friday'
  //                   },
  //                   {
  //                     key: "Saturday",
  //                     name: 'Saturday',
  //                     label: 'Saturday'
  //                   },
  //                   {
  //                     key: "Sunday",
  //                     name: 'Sunday',
  //                     label: 'Sunday'
  //                   }
  //                 ]}
  //               />
  //               <Field
  //                 name="field3"
  //                 label="with Field"
  //                 component={RadioInputGroupField}
  //                 helperText="please select items"
  //                 fullWidth
  //                 margin="normal"
  //                 options={[
  //                   {
  //                     key: "radio1",
  //                     name: 'radio1',
  //                     label: 'normal radio',
  //                     MuiRadioProps: {
  //                       color: 'primary'
  //                     }
  //                   },
  //                   {
  //                     key: "radio2",
  //                     name: 'radio2',
  //                     label: 'checked with text input',
  //                     MuiRadioProps: {
  //                       color: 'primary'
  //                     },
  //                     toggleInput: true
  //                   },
  //                   {
  //                     key: "radio3",
  //                     name: 'radio3',
  //                     label: 'checked with text input',
  //                     toggleInput: true
  //                   }
  //                 ]}
  //                 /* Pass meta props cause the failed prop type and don't worry it's just for demo */
  //                 meta={{
  //                   invalid: true,
  //                   touched: true,
  //                   error: 'fill in this option is required!'
  //                 }}
  //               />
  //             </ReduxForm>
  //           </Grid>
  //           <Grid item xs={6}>
  //             <Highlight
  //               code={JSON.stringify(values, null, 4)}
  //               type="language-json"
  //             />
  //           </Grid>
  //         </Grid>
  //       );
  //     };
  //     return <Form />;
  //   },
  //   {
  //     notes,
  //     info: {
  //       propTables: [RadioInputGroup],
  //       propTablesExclude: [Provider]
  //     }
  //   }
  // );
