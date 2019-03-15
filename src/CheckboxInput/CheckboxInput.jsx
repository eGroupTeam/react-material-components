import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';

import Checkbox from '../Checkbox';

import styles from './styles';

export class CheckboxInputComponent extends Component {
  static propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * If checked is not null component will be controlled external.
     */
    checked: PropTypes.bool,
    /**
     * If not controlled, use internal state.
     */
    onChange: PropTypes.func,
    /**
     * Pass customize input props which extend from react-material
     */
    MUIInputProps: PropTypes.object,
    /**
     * @ignore
     */
    defaultChecked: PropTypes.bool,
    /**
     * Enable show/hide input if checked/unchecked.
     */
    toggleInput: PropTypes.bool
  };

  constructor(props) {
    super();
    this.isControlled = props.checked !== undefined;
    this.state = {};
    if (!this.isControlled) {
      // not controlled, use internal state
      this.state._checked =
        props.defaultChecked !== undefined ? props.defaultChecked : false;
    }
  }

  handleCheckboxChange = e => {
    const { onChange } = this.props;

    if (!this.isControlled) {
      this.setState({ _checked: e.target.checked });
    }

    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const { _checked } = this.state;
    const {
      classes,
      checked: checkedProp,
      onChange,
      MUIInputProps,
      toggleInput,
      ...other
    } = this.props;
    const { className: InputClassName, ...otherMUIInputProps } =
      MUIInputProps || {};
    const checked = this.isControlled ? checkedProp : _checked;
    return (
      <React.Fragment>
        <Checkbox
          checked={checked}
          onChange={this.handleCheckboxChange}
          {...other}
        />
        {toggleInput && checked && (
          <Input
            className={classNames(classes.inputRoot, InputClassName)}
            {...otherMUIInputProps}
          />
        )}
      </React.Fragment>
    );
  }
}

const CheckboxInput = withStyles(styles)(CheckboxInputComponent);

CheckboxInput.displayName = 'CheckboxInput';

export default CheckboxInput;
