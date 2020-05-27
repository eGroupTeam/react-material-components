import React from 'react';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';
import { store as immutableStore } from '../redux/immutable/configureStore';

import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fields, FieldArray } from 'redux-form';
import { Fields as ImmutableFields, FieldArray as ImmutableFieldArray } from 'redux-form/immutable';
import SimpleAddressFields from '@e-group/material-form/SimpleAddressFields';
import ImmutableSimpleAddressFields from '@e-group/material-form/immutable/SimpleAddressFields';

storiesOf('SimpleAddress', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'with Field',
    () => {
      const renderList = ({ fields }) => {
        return fields.map((field, index) => (
          <div key={index}>
            <Fields
              key={index}
              names={[
                `${field}.city`,
                `${field}.area`,
                `${field}.postalCode`,
              ]}
              component={SimpleAddressFields}
            />
          </div>
        ))
      };

      const Form = () => {
        const [values, setValues] = React.useState({
          city: '基隆市',
          area: '三重',
          postalCode: '100',
          addressList:[{
            city: '基隆市',
            area: '三重',
            postalCode: '100'
          },{
            city: '基隆市',
            area: '三重',
            postalCode: '100'
          },{
            city: '基隆市',
            area: '三重',
            postalCode: '100'
          }]
        });
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={values}>
                <Typography variant="h6">default</Typography>
                <Fields
                  names={['city', 'area', 'postalCode']}
                  component={SimpleAddressFields}
                />
                <Fields
                  names={['city', 'area', 'postalCode']}
                  component={SimpleAddressFields}
                  MuiTextFieldProps={{
                    helperText: "TEST",
                    label: "TEST",
                    style: {
                      minWidth: 120,
                    }
                  }}
                  cityProps={{
                    label: "戶籍縣市",
                    helperText: "縣市",
                  }}
                  areaProps={{
                    label: "戶籍地區",
                    helperText: "地區",
                  }}
                  postalCodeProps={{
                    label: "郵遞區號"
                  }}
                />
                <Fields
                  names={['city', 'area', 'postalCode']}
                  MuiTextFieldProps={{
                    fullWidth: true,
                    margin: "normal",
                  }}
                  cityProps={{
                    label: "縣市"
                  }}
                  areaProps={{
                    label: "地區"
                  }}
                  postalCodeProps={{
                    label: "郵遞區號"
                  }}
                  component={SimpleAddressFields}
                  render={(field1, field2, field3) => (
                    <Grid container>
                      <Grid item xs={12}>{field1}</Grid>
                      <Grid item xs={12}>{field2}</Grid>
                      <Grid item xs={12}>{field3}</Grid>
                    </Grid>
                  )}
                />
                <Typography variant="h6">without postalCode</Typography>
                <Fields
                  names={['city', 'area']}
                  component={SimpleAddressFields}
                />
                <Fields
                  names={['city', 'area']}
                  component={SimpleAddressFields}
                  render={(field1, field2, field3) => (
                    <Grid container>
                      <Grid item xs={12}>{field1}</Grid>
                      <Grid item xs={12}>{field2}</Grid>
                      <Grid item xs={12}>{field3}</Grid>
                    </Grid>
                  )}
                />
                <Typography variant="h6">with nest Fields</Typography>
                <FieldArray name="addressList" component={renderList} />
                <Typography variant="h6">with Error</Typography>
                <Fields
                  names={['city', 'area', 'postalCode']}
                  MuiTextFieldProps={{
                    fullWidth: true,
                    margin: "normal",
                  }}
                  cityProps={{
                    label: "縣市"
                  }}
                  areaProps={{
                    label: "地區"
                  }}
                  postalCodeProps={{
                    label: "郵遞區號"
                  }}
                  component={SimpleAddressFields}
                  /* Pass props to test error status */
                  city={{
                    input: {
                      value: '',
                      onChange: () => {}
                    },
                    meta:{
                      invalid: true,
                      touched: true,
                      error: 'city error message'
                    }
                  }}
                  area={{
                    input: {
                      value: '',
                      onChange: () => {}
                    },
                    meta:{
                      invalid: true,
                      touched: true,
                      error: 'area error message'
                    }
                  }}
                  postalCode={{
                    input: {
                      value: '',
                      onChange: () => {}
                    },
                    meta:{
                      invalid: true,
                      touched: true,
                      error: 'postalCode error message'
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
    }
  )

storiesOf('SimpleAddress', module)
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'with immutable Field',
    () => {
      const renderList = ({ fields }) => {
        return fields.map((field, index) => (
          <div key={index}>
            <ImmutableFields
              key={index}
              names={[
                `${field}.city`,
                `${field}.area`,
                `${field}.postalCode`,
              ]}
              component={ImmutableSimpleAddressFields}
            />
          </div>
        ))
      };

      const Form = () => {
        const [values, setValues] = React.useState({
          city: '基隆市',
          area: '三重',
          postalCode: '100',
          addressList:[{
            city: '基隆市',
            area: '三重',
            postalCode: '100'
          },{
            city: '基隆市',
            area: '三重',
            postalCode: '100'
          },{
            city: '基隆市',
            area: '三重',
            postalCode: '100'
          }]
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Typography variant="h6">default</Typography>
                <ImmutableFields
                  names={['city', 'area', 'postalCode']}
                  component={ImmutableSimpleAddressFields}
                />
                <ImmutableFields
                  names={['city', 'area', 'postalCode']}
                  component={ImmutableSimpleAddressFields}
                  MuiTextFieldProps={{
                    helperText: "TEST",
                    label: "TEST",
                    style: {
                      minWidth: 120,
                    }
                  }}
                  cityProps={{
                    label: "戶籍縣市",
                    helperText: "縣市",
                  }}
                  areaProps={{
                    label: "戶籍地區",
                    helperText: "地區",
                  }}
                  postalCodeProps={{
                    label: "郵遞區號"
                  }}
                />
                <ImmutableFields
                  names={['city', 'area', 'postalCode']}
                  MuiTextFieldProps={{
                    fullWidth: true,
                    margin: "normal",
                  }}
                  cityProps={{
                    label: "縣市"
                  }}
                  areaProps={{
                    label: "地區"
                  }}
                  postalCodeProps={{
                    label: "郵遞區號"
                  }}
                  component={ImmutableSimpleAddressFields}
                  render={(field1, field2, field3) => (
                    <Grid container>
                      <Grid item xs={12}>{field1}</Grid>
                      <Grid item xs={12}>{field2}</Grid>
                      <Grid item xs={12}>{field3}</Grid>
                    </Grid>
                  )}
                />
                <Typography variant="h6">without postalCode</Typography>
                <ImmutableFields
                  names={['city', 'area']}
                  component={ImmutableSimpleAddressFields}
                />
                <ImmutableFields
                  names={['city', 'area']}
                  component={ImmutableSimpleAddressFields}
                  render={(field1, field2, field3) => (
                    <Grid container>
                      <Grid item xs={12}>{field1}</Grid>
                      <Grid item xs={12}>{field2}</Grid>
                      <Grid item xs={12}>{field3}</Grid>
                    </Grid>
                  )}
                />
                <Typography variant="h6">with nest Fields</Typography>
                <ImmutableFieldArray name="addressList" component={renderList} />
                <Typography variant="h6">with Error</Typography>
                <ImmutableFields
                  names={['city', 'area', 'postalCode']}
                  MuiTextFieldProps={{
                    fullWidth: true,
                    margin: "normal",
                  }}
                  cityProps={{
                    label: "縣市"
                  }}
                  areaProps={{
                    label: "地區"
                  }}
                  postalCodeProps={{
                    label: "郵遞區號"
                  }}
                  component={ImmutableSimpleAddressFields}
                  /* Pass props to test error status */
                  city={{
                    input: {
                      value: '',
                      onChange: () => {}
                    },
                    meta:{
                      invalid: true,
                      touched: true,
                      error: 'city error message'
                    }
                  }}
                  area={{
                    input: {
                      value: '',
                      onChange: () => {}
                    },
                    meta:{
                      invalid: true,
                      touched: true,
                      error: 'area error message'
                    }
                  }}
                  postalCode={{
                    input: {
                      value: '',
                      onChange: () => {}
                    },
                    meta:{
                      invalid: true,
                      touched: true,
                      error: 'postalCode error message'
                    }
                  }}
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
    }
  )
