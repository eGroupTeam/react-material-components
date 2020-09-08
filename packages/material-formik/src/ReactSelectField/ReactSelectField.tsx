import React, { FC } from 'react';
import ReactSelect, {
  ReactSelectProps
} from '@e-group/material-module/ReactSelect';
import { FieldProps } from 'formik';
import useFieldStatus from '../utils/useFieldStatus';

export interface ReactSelectFieldProps extends ReactSelectProps, FieldProps {}

const ReactSelectField: FC<ReactSelectFieldProps> = props => {
  const {
    field: { value, ...field },
    form: { setFieldValue },
    onChange,
    onInputChange,
    options,
    MuiTextFieldProps,
    isDisabled: isDisabledProp,
    ...other
  } = props;
  const { fieldError, showError, disabled, hasValue } = useFieldStatus(
    props.field,
    props.form,
    isDisabledProp
  );
  const [inputValue, setInputValue] = React.useState('');

  const { error: errorProp, helperText, ...otherMuiTextFieldProps } =
    MuiTextFieldProps || {};
  const handleChange: ReactSelectProps['onChange'] = (option, actionMeta) => {
    let nextValue = option;
    if (onChange) {
      onChange(option, actionMeta);
    }
    // To fixed when use multi select and remove the last value will return null.
    if (
      actionMeta.action === 'remove-value' &&
      nextValue === null &&
      props.isMulti
    ) {
      nextValue = [];
    }
    setFieldValue(field.name, nextValue);
  };

  // To keep value after onBlur please read this issue.
  // https://github.com/JedWatson/react-select/issues/3189
  const handleInputChange: ReactSelectProps['onInputChange'] = (
    inputValue,
    actionMeta
  ) => {
    if (onInputChange) {
      onInputChange(inputValue, actionMeta);
    }
    if (
      actionMeta.action !== 'input-blur' &&
      actionMeta.action !== 'menu-close'
    ) {
      setInputValue(inputValue);
    }
  };

  return (
    <ReactSelect
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      isDisabled={disabled}
      MuiTextFieldProps={{
        error: showError,
        helperText: showError ? fieldError : helperText,
        disabled: disabled,
        ...otherMuiTextFieldProps
      }}
      value={hasValue ? value : null}
      {...field}
      {...other}
      onChange={handleChange}
    />
  );
};

export default ReactSelectField;
