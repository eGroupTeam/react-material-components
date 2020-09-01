import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, InjectedFormProps } from 'redux-form';

export const FORM = 'reduxForm'

class ReduxForm extends Component<InjectedFormProps> {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, children } = this.props;
    return <form onSubmit={handleSubmit}>{children}</form>;
  }
}

export default reduxForm({ form: FORM })(ReduxForm);
