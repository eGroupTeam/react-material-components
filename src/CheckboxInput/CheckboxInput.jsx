import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Checkbox from '../Checkbox';
import Input from '../Input';

import styles from './styles';

class CheckboxInput extends Component {
  static propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * Pass customize checkbox props which extend from react-material
     */
    CheckboxProps: PropTypes.object,
    /**
     * Pass customize input props which extend from react-material
     */
    InputProps: PropTypes.object,
    /**
     * @ignore
     */
    defaultChecked: PropTypes.bool,
    /**
     * Enable show/hide input if checked/unchecked.
     */
    checkedInput: PropTypes.bool
  };

  constructor(props) {
    super();
    this.isControlled =
      props.CheckboxProps && props.CheckboxProps.checked !== null;
    this.state = {};
    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.checked =
        props.defaultChecked !== undefined ? props.defaultChecked : false;
    }
  }

  handleCheckboxChange = e => {
    const { CheckboxProps } = this.props;
    const checked = e.target.checked;

    if (!this.isControlled) {
      this.setState({ checked });
    }

    if (CheckboxProps && CheckboxProps.onChange) {
      CheckboxProps.onChange(e);
    }
  };

  render() {
    const { classes, CheckboxProps, InputProps, checkedInput } = this.props;
    const { onChange, ...otherCheckboxProps } = CheckboxProps;
    const { className: InputClassName, ...otherInputProps } = InputProps;
    const checked = this.isControlled
      ? CheckboxProps.checked
      : this.state.checked;
    return (
      <React.Fragment>
        <Checkbox
          checked={checked}
          onChange={this.handleCheckboxChange}
          {...otherCheckboxProps}
        />
        {checkedInput && checked && (
          <Input
            className={classNames(classes.inputRoot, InputClassName)}
            {...otherInputProps}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(CheckboxInput);
