import React from 'react';
import { Provider } from 'react-redux';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Fields, FieldArray } from 'redux-form/immutable';
import SimpleAddressFields from '@e-group/material-form/SimpleAddressFields';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store as immutableStore } from '../redux/immutable/configureStore';

storiesOf('SimpleAddress', module)
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          city: '基隆市',
          area: '三重',
          postalCode: '100'
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm onChange={handleChange} initialValues={fromJS(values)}>
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
  .add(
    'without postalCode',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          city: '基隆市',
          area: '三重'
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm onChange={handleChange} initialValues={fromJS(values)}>
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
  .add(
    'with nest Fields',
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
                <FieldArray name="addressList" component={renderList} />
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
  .add(
    'with Error',
    () => {
      const Form = () => {
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm >
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
              </ImmutableReduxForm>
            </Grid>
          </Grid>
        );
      };
      return <Form />;
    }
  );
