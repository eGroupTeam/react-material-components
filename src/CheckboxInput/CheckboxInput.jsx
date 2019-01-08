import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import Input from '../Input';

export default class CheckboxInput extends Component {
  static propTypes = {
    CheckboxProps: PropTypes.object,
    InputProps: PropTypes.object,
    checkedInput: PropTypes.bool
  };

  state = {
    checked: false
  };

  handleChange = e => {
    this.setState({
      checked: e.target.checked
    });
  };

  render() {
    const { checked } = this.state;
    const { CheckboxProps, InputProps, checkedInput } = this.props;
    let isShowInput = checkedInput && checked;
    // show input if user has customize checked
    if (CheckboxProps && CheckboxProps.checked)
      isShowInput = checkedInput && CheckboxProps.checked;
    return (
      <React.Fragment>
        <Checkbox
          checked={checked}
          onChange={this.handleChange}
          {...CheckboxProps}
        />
        {isShowInput && <Input {...InputProps} />}
      </React.Fragment>
    );
  }
}
