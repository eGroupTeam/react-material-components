import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import clsx from 'clsx';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';

const selectComponent = {
  normal: Select,
  creatable: CreatableSelect
};

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

const ReactSelect = ({ components, variant = 'normal', ...other }) => {
  const SelectComponent = selectComponent[variant];
  const classes = useStyles();
  const theme = useTheme();

  // To fixed input text color in type=dark
  const selectStyles = {
    input: provided => ({
      ...provided,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create('box-shadow'),
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`
    }),
    /**
     * MenuPortal zIndex need use modal zIndex add 1 to fixed the bug when InputLabel is filled or outlined
     * because it's zIndex will more than modal zIndex.
     * Please read following Mui implementation for more info.
     * https://github.com/mui-org/material-ui/blob/c28697d0ba4c891f826133a77e58f298dc50c4bb/packages/material-ui/src/InputLabel/InputLabel.js
     */
    menuPortal: provided => ({ ...provided, zIndex: theme.zIndex.modal + 1 })
  };

  return (
    <SelectComponent
      classes={classes}
      styles={selectStyles}
      components={{
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
  MuiTextFieldProps: PropTypes.object,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['normal', 'creatable'])
};

export default ReactSelect;
