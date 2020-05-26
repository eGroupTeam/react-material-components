import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';

export const FORM = 'immutableJsReduxForm'

class ImmutableJsReduxForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  };

  render() {
    const { handleSubmit, children } = this.props;
    return <form onSubmit={handleSubmit}>{children}</form>;
  }
}

export default reduxForm({ form: FORM })(ImmutableJsReduxForm);
