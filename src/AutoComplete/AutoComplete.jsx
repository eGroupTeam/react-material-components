import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Select, { components } from 'react-select';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = theme => ({
  input: {
    display: 'flex'
  },
  singleInput: {
    height: '21px'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${theme.spacing(1) / 2}px ${theme.spacing(1) / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  },
  indicator: {
    cursor: 'pointer'
  }
});

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
  const { InputLabelProps, InputProps, ...other } =
    props.selectProps.MuiTextFieldProps || {};
  const { inputValue } = props.selectProps;
  return (
    <TextField
      InputLabelProps={{
        shrink: props.isFocused || props.hasValue || inputValue !== '',
        ...InputLabelProps
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: classNames(props.selectProps.classes.input, {
            [props.selectProps.classes.singleInput]: !props.isMulti
          }),
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        },
        ...InputProps
      }}
      {...other}
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
  if (
    props.selectProps.MuiTextFieldProps &&
    props.selectProps.MuiTextFieldProps.label
  )
    return null;
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
    components: PropTypes.object,
    /**
     * Mui `TextField` props.
     */
    MuiTextFieldProps: PropTypes.object
  };

  render() {
    const { classes, theme, components, ...other } = this.props;

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
        {...other}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(AutoComplete);
