import React, { ReactNode } from 'react';

import { fromJS } from '@e-group/immutable';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fields, FieldArray } from 'redux-form/immutable';
// @ts-ignore
// TODO: Need depreciated this component.
import SimpleAddressFields from '@e-group/material-form/immutable/SimpleAddressFields';
import PureSimpleAddressFields from '@e-group/material-form/SimpleAddressFields';
import { Meta } from '@storybook/react';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';
import { store } from '../redux/immutable/configureStore';

export default {
  title: 'Modules/SimpleAddress',
  component: PureSimpleAddressFields,
} as Meta;

const renderList = ({ fields }: any) => fields.map((field: any) => (
    <div key={field}>
      <Fields
        names={[`${field}.city`, `${field}.area`, `${field}.postalCode`]}
        component={SimpleAddressFields}
      />
    </div>
  ));

export const WithReduxFormImmutableField = () => {
  const [values, setValues] = React.useState({
    city: '基隆市',
    area: '三重',
    postalCode: '100',
    addressList: [
      {
        city: '基隆市',
        area: '三重',
        postalCode: '100',
      },
      {
        city: '基隆市',
        area: '三重',
        postalCode: '100',
      },
      {
        city: '基隆市',
        area: '三重',
        postalCode: '100',
      },
    ],
  });
  const handleChange = (values: any) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm
            onChange={handleChange}
            initialValues={fromJS(values) as any}
          >
            <Typography variant="h6">default</Typography>
            <Fields
              names={['city', 'area', 'postalCode']}
              component={SimpleAddressFields}
            />
            <Fields
              names={['city', 'area', 'postalCode']}
              component={SimpleAddressFields}
              MuiTextFieldProps={{
                helperText: 'TEST',
                label: 'TEST',
                style: {
                  minWidth: 120,
                },
              }}
              cityProps={{
                label: '戶籍縣市',
                helperText: '縣市',
              }}
              areaProps={{
                label: '戶籍地區',
                helperText: '地區',
              }}
              postalCodeProps={{
                label: '郵遞區號',
              }}
            />
            <Fields
              names={['city', 'area', 'postalCode']}
              MuiTextFieldProps={{
                fullWidth: true,
                margin: 'normal',
              }}
              cityProps={{
                label: '縣市',
              }}
              areaProps={{
                label: '地區',
              }}
              postalCodeProps={{
                label: '郵遞區號',
              }}
              component={SimpleAddressFields}
              render={(
                field1: ReactNode,
                field2: ReactNode,
                field3: ReactNode
              ) => (
                <Grid container>
                  <Grid item xs={12}>
                    {field1}
                  </Grid>
                  <Grid item xs={12}>
                    {field2}
                  </Grid>
                  <Grid item xs={12}>
                    {field3}
                  </Grid>
                </Grid>
              )}
            />
            <Typography variant="h6">without postalCode</Typography>
            <Fields names={['city', 'area']} component={SimpleAddressFields} />
            <Fields
              names={['city', 'area']}
              component={SimpleAddressFields}
              render={(
                field1: ReactNode,
                field2: ReactNode,
                field3: ReactNode
              ) => (
                <Grid container>
                  <Grid item xs={12}>
                    {field1}
                  </Grid>
                  <Grid item xs={12}>
                    {field2}
                  </Grid>
                  <Grid item xs={12}>
                    {field3}
                  </Grid>
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
                margin: 'normal',
              }}
              cityProps={{
                label: '縣市',
              }}
              areaProps={{
                label: '地區',
              }}
              postalCodeProps={{
                label: '郵遞區號',
              }}
              component={SimpleAddressFields}
              /* Pass props to test error status */
              city={{
                input: {
                  value: '',
                  onChange: () => {},
                },
                meta: {
                  invalid: true,
                  touched: true,
                  error: 'city error message',
                },
              }}
              area={{
                input: {
                  value: '',
                  onChange: () => {},
                },
                meta: {
                  invalid: true,
                  touched: true,
                  error: 'area error message',
                },
              }}
              postalCode={{
                input: {
                  value: '',
                  onChange: () => {},
                },
                meta: {
                  invalid: true,
                  touched: true,
                  error: 'postalCode error message',
                },
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
    </Provider>
  );
};
