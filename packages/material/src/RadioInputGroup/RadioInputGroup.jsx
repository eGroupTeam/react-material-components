import React from 'react';
import PropTypes from 'prop-types';

import warning from 'warning';
import useControlled from '../utils/useControlled';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import RadioInput from '../RadioInput';
import RadioGroupContext from '@material-ui/core/RadioGroup/RadioGroupContext';

const RadioInputGroup = props => {
  const {
    label,
    options,
    helperText,
    value: valueProp,
    name,
    onChange,
    MuiFormLabelProps,
    MuiFormGroupProps,
    MuiFormHelperTextProps,
    children,
    ...other
  } = props;

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: props.defaultValue
  });

  warning(
    children === undefined,
    'RadioInputGroup should not has children please use `options` only!'
  );

  const handleChange = event => {
    const newValue = event.target.value;

    setValue(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  return (
    <FormControl {...other}>
      <FormLabel {...MuiFormLabelProps}>{label}</FormLabel>
      <RadioGroupContext.Provider
        value={{ name, onChange: handleChange, value }}
      >
        <FormGroup {...MuiFormGroupProps}>
          {options.map((option, index) => (
            <RadioInput key={option.key || index} {...option} />
          ))}
        </FormGroup>
      </RadioGroupContext.Provider>
      {helperText && (
        <FormHelperText {...MuiFormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

RadioInputGroup.propTypes = {
  /**
   * The content of the FormLabel.
   */
  label: PropTypes.string,
  /**
   * Options to generate group items.
   */
  options: PropTypes.array.isRequired,
  /**
   * The content of the FormHelperText.
   */
  helperText: PropTypes.string,
  /**
   * Value of the selected radio button. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The name used to reference the value of the control.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a radio button is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * Mui `FormLabel` Props
   */
  MuiFormLabelProps: PropTypes.object,
  /**
   * Mui `FormGroup` Props
   */
  MuiFormGroupProps: PropTypes.object,
  /**
   * Mui `FormHelperText` Props
   */
  MuiFormHelperTextProps: PropTypes.object
};

export default RadioInputGroup;
