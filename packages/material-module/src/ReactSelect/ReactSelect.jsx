import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import clsx from 'clsx';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Select, { components } from 'react-select';
import Fade from '@material-ui/core/Fade';
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
  single: {
    height: 19
  },
  multi: {
    height: 'auto'
  },
  multiStandard: {
    padding: 0
  },
  multiFilled: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: 0
  },
  multiOutlined: {
    paddingTop: 9,
    paddingBottom: 7
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing(1, 0.25)
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
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 9999,
    marginTop: theme.spacing(),
    left: 0,
    right: 0
  },
  indicator: {
    cursor: 'pointer'
  },
  separator: {
    alignSelf: 'center',
    backgroundColor: 'hsl(0,0%,80%)',
    width: 1,
    height: theme.spacing(2)
  }
});

const useStyles = makeStyles(styles);

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
  const { InputLabelProps, InputProps, inputProps, variant, ...other } =
    props.selectProps.MuiTextFieldProps || {};
  const { inputValue } = props.selectProps;
  const isMulti = props.isMulti;
  const isFilled = variant === 'filled';
  const isOutlined = variant === 'outlined';
  const isStandard = !isFilled && !isOutlined;
  return (
    <TextField
      InputLabelProps={{
        shrink: props.isFocused || props.hasValue || inputValue !== '',
        ...InputLabelProps
      }}
      InputProps={{
        inputComponent,
        ...InputProps
      }}
      inputProps={{
        className: clsx(
          props.selectProps.classes.input,
          {
            [props.selectProps.classes.single]: !isMulti
          },
          {
            [props.selectProps.classes.multi]: isMulti
          },
          {
            [props.selectProps.classes.multiStandard]: isMulti && isStandard
          },
          {
            [props.selectProps.classes.multiFilled]: isMulti && isFilled
          },
          {
            [props.selectProps.classes.multiOutlined]: isMulti && isOutlined
          }
        ),
        inputRef: props.innerRef,
        children: props.children,
        ...inputProps,
        ...props.innerProps
      }}
      variant={variant}
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
  const { variant } = props.selectProps.MuiTextFieldProps || {};
  const isFocused = props.isFocused;
  const isFilled = variant === 'filled';
  return (
    <Chip
      {...props.selectProps.ChipProps}
      tabIndex={-1}
      label={props.children}
      size="small"
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: isFocused
      })}
      color={isFilled ? 'primary' : undefined}
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

const IndicatorSeparator = props => {
  return <span className={props.selectProps.classes.separator} />;
};

const ReactSelect = ({ components, ...other }) => {
  const classes = useStyles();
  const theme = useTheme();

  // To fixed input text color in type=dark
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
};

ReactSelect.propTypes = {
  /**
   * react-select props to customize components
   */
  components: PropTypes.object,
  /**
   * Mui `TextField` props.
   */
  MuiTextFieldProps: PropTypes.object
};

export default ReactSelect;
