import React, { FC, useState } from 'react';

import { Meta } from '@storybook/react';

import { Provider } from 'react-redux';
import ReactSelect from '@e-group/material-module/ReactSelect';
import ReactSelectField from '@e-group/material-form/ReactSelectField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { Field } from 'redux-form';
import { Button } from '@material-ui/core';
import { store } from '../redux/configureStore';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';

export default {
  title: 'Components/ReactSelect',
  component: ReactSelect,
} as Meta;

export const Default: FC = () => {
  return (
    <>
      <ReactSelect
        isClearable
        MuiTextFieldProps={{
          label: 'Single Select',
        }}
        placeholder="Placeholder"
        options={[
          {
            label: 'I am label',
            value: 'value',
          },
        ]}
      />
      <ReactSelect
        variant="creatable"
        isClearable
        MuiTextFieldProps={{
          label: 'Creatable Select',
          fullWidth: true,
          InputProps: {
            disableUnderline: false,
          },
        }}
        placeholder="Placeholder"
        options={[
          {
            label: 'I am label',
            value: 'value',
          },
        ]}
      />
    </>
  );
};

export const WithMultiSelect: FC = () => {
  return (
    <>
      <ReactSelect
        MuiTextFieldProps={{
          label: 'Multi Select',
          fullWidth: true,
          InputProps: {
            disableUnderline: false,
          },
        }}
        isMulti
        options={[
          {
            label: 'label',
            value: 'value2',
          },
          {
            label: 'label2',
            value: 'value3',
          },
          {
            label:
              'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
            value: 'value4',
          },
          {
            label:
              'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
            value: 'value5',
          },
        ]}
      />
      <ReactSelect
        variant="creatable"
        MuiTextFieldProps={{
          label: 'Creatable Multi Select',
          fullWidth: true,
          InputProps: {
            disableUnderline: false,
          },
        }}
        isMulti
        options={[
          {
            label: 'label',
            value: 'value2',
          },
          {
            label: 'label2',
            value: 'value3',
          },
          {
            label:
              'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
            value: 'value4',
          },
          {
            label:
              'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
            value: 'value5',
          },
        ]}
      />
    </>
  );
};

export const WithDefaultValue: FC = () => {
  return (
    <>
      <ReactSelect
        MuiTextFieldProps={{
          label: 'Single Select',
          fullWidth: true,
          InputProps: {
            disableUnderline: false,
          },
          margin: 'normal',
        }}
        value={{
          label: 'I am label',
          value: 'value',
        }}
      />
      <ReactSelect
        MuiTextFieldProps={{
          label: 'Multi Select',
          fullWidth: true,
          InputProps: {
            disableUnderline: false,
          },
        }}
        isMulti
        value={[
          {
            label: 'label4',
            value: 'value2',
          },
          {
            label: 'label5',
            value: 'value3',
          },
        ]}
      />
    </>
  );
};

const Option = (props: any) => {
  const { userName, userPhone, userOrganizationName } = props.data;
  return (
    <ListItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      button
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      <ListItemText
        primary={userName}
        secondary={
          <>
            <Typography component="span" color="textPrimary">
              {userOrganizationName}
            </Typography>{' '}
            {userPhone}
          </>
        }
      />
    </ListItem>
  );
};

type OptionType = {
  value: string;
  label: string;
  userName: string;
  userOrganizationName: string;
  userPhone: string;
};

export const WithCustomizedOption: FC = () => {
  const options: OptionType[] = [
    {
      userName: 'userName',
      userOrganizationName: 'userOrganizationName',
      userPhone: 'userPhone',
      value: 'userName',
      label: 'userName',
    },
  ];
  return (
    <ReactSelect
      MuiTextFieldProps={{
        fullWidth: true,
        InputProps: {
          disableUnderline: false,
        },
      }}
      options={options}
      components={{
        Option,
      }}
    />
  );
};

export const WithDialog: FC = () => {
  const [open, setOpen] = useState(false);
  const options = [
    {
      label: 'I am label',
      value: 'value',
    },
    {
      label: 'I am label',
      value: 'value1',
    },
    {
      label: 'I am label',
      value: 'value2',
    },
    {
      label: 'I am label',
      value: 'value3',
    },
    {
      label: 'I am label',
      value: 'value4',
    },
    {
      label: 'I am label',
      value: 'value5',
    },
    {
      label: 'I am label',
      value: 'value6',
    },
  ];
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogContent>
          <ReactSelect
            variant="creatable"
            isClearable
            placeholder="Placeholder"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            options={options}
            MuiTextFieldProps={{
              label: 'label',
              variant: 'outlined',
              fullWidth: true,
            }}
          />
          <Box height="100px" />
          <ReactSelect
            variant="creatable"
            isClearable
            placeholder="Placeholder"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            options={options}
            MuiTextFieldProps={{
              label: 'label',
              variant: 'outlined',
              fullWidth: true,
            }}
          />
          <Box height="500px" />
          <ReactSelect
            isClearable
            placeholder="Placeholder"
            menuPortalTarget={document.body}
            menuPlacement="auto"
            menuPosition="fixed"
            options={options}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export const WithReduxFormField: FC = () => {
  const initialValues = {
    field1: {
      label: 'I am label',
      value: 'value',
    },
    field2: {
      label: 'I am label',
      value: 'value',
    },
    field3: {
      label: 'I am label',
      value: 'value',
    },
    field4: [
      {
        label: 'label4',
        value: 'value2',
      },
      {
        label: 'label5',
        value: 'value3',
      },
    ],
    field5: [
      {
        label: 'label4',
        value: 'value2',
      },
      {
        label: 'label5',
        value: 'value3',
      },
    ],
    field6: 'value2',
    field7: ['value2', 'value3'],
  };
  const [values, setValues] = useState(initialValues);
  const options = [
    {
      label: 'label',
      value: 'value2',
    },
    {
      label: 'label2',
      value: 'value3',
    },
    {
      label: 'label3',
      value: 'value4',
    },
    {
      label: 'label4',
      value: 'value5',
    },
    {
      label: 'label5',
      value: 'value6',
    },
  ];
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={initialValues}>
            <Field
              name="field1"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
                helperText: 'customized helperText',
              }}
            />
            <Field
              name="field2"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Error Message',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
              }}
              /* Pass meta props cause the failed prop type and don't worry it's just for demo */
              meta={{
                invalid: true,
                touched: true,
                error: 'error message',
              }}
            />
            <Field
              variant="creatable"
              name="field3"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Creatable Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
              }}
            />
            <Field
              name="field4"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              MuiTextFieldProps={{
                label: 'Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
              }}
            />
            <Field
              variant="creatable"
              name="field5"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              MuiTextFieldProps={{
                label: 'Creatable Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
              }}
            />
            <Field
              name="field6"
              component={ReactSelectField}
              options={options}
              isClearable
              format={(value: any) => {
                if (typeof value === 'string') {
                  return {
                    label: value,
                    value,
                  };
                }
                return value;
              }}
              normalize={(value: any) => {
                if (value) return value.value;
                return value;
              }}
              MuiTextFieldProps={{
                label: 'Normalize Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
              }}
            />
            <Field
              name="field7"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              format={(value: any) => {
                if (Array.isArray(value)) {
                  return value.map((el) => ({
                    label: el,
                    value: el,
                  }));
                }
                return value;
              }}
              normalize={(value: any) => {
                if (value) return value.map((el: any) => el.value);
                return value;
              }}
              MuiTextFieldProps={{
                label: 'Normalize Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false,
                },
                margin: 'normal',
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
