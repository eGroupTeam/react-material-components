import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { InjectedFormProps } from 'redux-form';

export const FORM = 'immutableReduxForm'

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
