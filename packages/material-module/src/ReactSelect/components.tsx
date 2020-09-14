import React from 'react';
import clsx from 'clsx';
import { components } from 'react-select';
import { Fade, Typography, TextField, Chip, MenuItem } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

const NoOptionsMessage = (props: any) => {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const inputComponent = (props: any) => {
  const { inputRef, ...other } = props;
  return <div ref={inputRef} {...other} />;
};

const Control = (props: any) => {
  const { InputLabelProps, InputProps, inputProps, variant, ...other } =
    props.selectProps.MuiTextFieldProps || {};
  const { inputValue } = props.selectProps;
  const { isMulti } = props;
  const isFilled = variant === 'filled';
  const isOutlined = variant === 'outlined';
  const isStandard = !isFilled && !isOutlined;
  return (
    <TextField
      InputLabelProps={{
        shrink: props.isFocused || props.hasValue || inputValue !== '',
        ...InputLabelProps,
      }}
      InputProps={{
        inputComponent,
        ...InputProps,
      }}
      inputProps={{
        className: clsx(
          props.selectProps.classes.input,
          {
            [props.selectProps.classes.single]: !isMulti,
          },
          {
            [props.selectProps.classes.multi]: isMulti,
          },
          {
            [props.selectProps.classes.multiStandard]: isMulti && isStandard,
          },
          {
            [props.selectProps.classes.multiFilled]: isMulti && isFilled,
          },
          {
            [props.selectProps.classes.multiOutlined]: isMulti && isOutlined,
          }
        ),
        inputRef: props.innerRef,
        children: props.children,
        ...inputProps,
        ...props.innerProps,
      }}
      variant={variant}
      {...other}
    />
  );
};

const Option = (props: any) => {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
};

const Placeholder = (props: any) => {
  if (props.children === 'Select...') return null;
  const hasLabel =
    props.selectProps.MuiTextFieldProps &&
    props.selectProps.MuiTextFieldProps.label;
  return (
    <Fade in={props.isFocused || !hasLabel}>
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    </Fade>
  );
};

const ValueContainer = (props: any) => {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
};

const SingleValue = (props: any) => {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
};

const MultiValue = (props: any) => {
  const { variant } = props.selectProps.MuiTextFieldProps || {};
  const { isFocused } = props;
  const isFilled = variant === 'filled';
  return (
    <Chip
      {...props.selectProps.ChipProps}
      tabIndex={-1}
      label={props.children}
      size="small"
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: isFocused,
      })}
      color={isFilled ? 'primary' : undefined}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon fontSize="small" {...props.removeProps} />}
    />
  );
};

const ClearIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.ClearIndicator
        className={props.selectProps.classes.indicator}
        {...props}
      />
    )
  );
};

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator
        className={props.selectProps.classes.indicator}
        {...props}
      />
    )
  );
};

const IndicatorSeparator = (props: any) => {
  return <span className={props.selectProps.classes.separator} />;
};

export default {
  Control,
  ClearIndicator,
  DropdownIndicator,
  IndicatorSeparator,
  NoOptionsMessage,
  Option,
  Placeholder,
  ValueContainer,
  SingleValue,
  MultiValue,
};
