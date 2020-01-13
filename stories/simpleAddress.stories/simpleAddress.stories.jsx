import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Fields } from 'redux-form/immutable';
import SimpleAddressFields from '@e-group/material-form/SimpleAddressFields';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';

storiesOf('SimpleAddress', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'with Fields',
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
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Fields
                  names={['city', 'area', 'postalCode']}
                  cityName="city"
                  areaName="area"
                  postalCodeName="postalCode"
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
  .add(
    'with Error',
    () => {
      const Form = () => {
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm >
                <Fields
                  names={['city', 'area', 'postalCode']}
                  cityName="city"
                  areaName="area"
                  postalCodeName="postalCode"
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
          </Grid>
        );
      };
      return <Form />;
    }
  );
