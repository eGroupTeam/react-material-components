import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Paper,
  Chip,
  MenuItem
} from '@material-ui/core';
import { Cancel as CancelIcon } from '@material-ui/icons';

import styles from './styles';

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      {...props.selectProps.TextFieldProps}
      InputLabelProps={{
        shrink: props.isFocused || props.hasValue
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  if (props.children === 'Select...') return null;
  if (props.selectProps.TextFieldProps.label) return null;
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function MultiValue(props) {
  return (
    <Chip
      {...props.selectProps.ChipProps}
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon fontSize="small" {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const ClearIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.ClearIndicator
        className={props.selectProps.classes.indicator}
        {...props}
      />
    )
  );
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator
        className={props.selectProps.classes.indicator}
        {...props}
      />
    )
  );
};

const IndicatorSeparator = ({ innerProps, getStyles }) => (
  <span
    style={{
      alignSelf: 'stretch',
      backgroundColor: 'hsl(0,0%,80%)',
      marginBottom: 4,
      marginTop: 4,
      width: 1
    }}
    {...innerProps}
  />
);

class AutoComplete extends React.Component {
  static propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * It includes all theming settings.
     */
    theme: PropTypes.object.isRequired,
    /**
     * react-select props to customize components
     */
    components: PropTypes.object
  };

  render() {
    const { classes, theme, components, ...rest } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit'
        }
      })
    };

    return (
      <Select
        classes={classes}
        styles={selectStyles}
        components={{
          Control,
          ClearIndicator,
          DropdownIndicator,
          IndicatorSeparator,
          Menu,
          NoOptionsMessage,
          Option,
          Placeholder,
          ValueContainer,
          SingleValue,
          MultiValue,
          ...components
        }}
        {...rest}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(AutoComplete);
