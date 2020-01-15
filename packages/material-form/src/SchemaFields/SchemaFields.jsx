import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form/immutable';
import TextLoadingField from '@e-group/material-form/TextLoadingField';
import RadioGroupField from '@e-group/material-form/RadioGroupField';
import CheckboxInputGroupField from '@e-group/material-form/CheckboxInputGroupField';
import CheckboxField from '@e-group/material-form/CheckboxField';

/**
 * A simple React component capable of building HTML forms out of a JSON schema and using material ui by default.
 * To understand json schema https://json-schema.org/learn/getting-started-step-by-step.html.
 * @param {*} param0
 */
const SchemaFields = ({
  schema: { required, properties },
  renderField,
  isRequiredError,
  atLeastOneIsRequiredError
}) => {
  const isRequired = React.useCallback(
    (value, allValues, formProps, name) => {
      if (!value) {
        return isRequiredError
          ? isRequiredError(properties[name])
          : 'Required field';
      }
      return undefined;
    },
    [isRequiredError, properties]
  );

  const atLeastOneIsRequired = React.useCallback(
    (value, allValues, formProps, name) => {
      const msg = atLeastOneIsRequiredError
        ? atLeastOneIsRequiredError(properties[name])
        : 'Need to select at least one option';
      if (!value) {
        return msg;
      }
      const checks = value.filter(el => el.get('checked'));
      if (checks.size === 0) {
        return msg;
      }
      return undefined;
    },
    [atLeastOneIsRequiredError, properties]
  );

  const generateField = (field, key) => {
    const { type, ...fieldOptions } = field;
    const hasRequired = required ? required.indexOf(key) > -1 : false;
    let fieldProps = {
      ...fieldOptions,
      required: hasRequired
    };

    switch (field.type) {
      case 'rating':
      case 'choiceone':
        fieldProps = {
          ...fieldProps,
          component: RadioGroupField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
      case 'choicemulti':
        fieldProps = {
          ...fieldProps,
          component: CheckboxInputGroupField,
          validate: hasRequired ? atLeastOneIsRequired : undefined
        };
        break;
      case 'string':
        fieldProps = {
          ...fieldProps,
          component: TextLoadingField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
      case 'boolean':
        fieldProps = {
          ...fieldProps,
          component: CheckboxField
        };
        break;
      default:
        fieldProps = {
          ...fieldProps,
          component: TextLoadingField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
    }
    if (renderField) {
      return renderField(fieldProps);
    }
    return <Field key={fieldProps.name} {...fieldProps} />;
  };

  return Object.keys(properties).map(key =>
    generateField(properties[key], key)
  );
};

// TODO: Need use coustomized proptype to fixed it.
// const fieldPropType = PropTypes.shape({
//   type: PropTypes.oneOf([
//     'rating',
//     'choiceone',
//     'choicemulti',
//     'string',
//     'boolean'
//   ]).isRequired,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   required: PropTypes.bool,
//   options: PropTypes.array
// });

SchemaFields.propTypes = {
  schema: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf([
      'null',
      'boolean',
      'object',
      'array',
      'number',
      'string'
    ]).isRequired,
    required: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.object.isRequired
  }).isRequired,
  renderField: PropTypes.func,
  isRequiredError: PropTypes.func,
  atLeastOneIsRequiredError: PropTypes.func
};

export default SchemaFields;
