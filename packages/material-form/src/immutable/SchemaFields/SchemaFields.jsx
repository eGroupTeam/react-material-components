import React from 'react';
import PropTypes from 'prop-types';

import warning from 'warning';

import { Field } from 'redux-form/immutable';
import RadioInputGroupField from '../RadioInputGroupField';
import CheckboxInputGroupField from '../CheckboxInputGroupField';
import ReactSelectField from '../ReactSelectField';
import TextLoadingField from '../../TextLoadingField';
import PickerField from '../../PickerField';
import CheckboxField from '../../CheckboxField';

/**
 * A simple React component capable of building HTML forms out of a JSON schema and using material ui by default.
 * To understand json schema https://json-schema.org/learn/getting-started-step-by-step.html.
 * Inspired by https://react-jsonschema-form.readthedocs.io/en/latest/#styling-your-forms.
 */
const SchemaFields = ({
  schema,
  renderField,
  isRequiredError,
  atLeastOneIsRequiredError
}) => {
  const { required, properties } = schema;
  const isRequired = React.useCallback(
    (value, allValues, formProps, name) => {
      if (!value) {
        return isRequiredError
          ? isRequiredError(value, allValues, formProps, name, properties)
          : 'Required field';
      }
      return undefined;
    },
    [isRequiredError, properties]
  );

  const atLeastOneIsRequired = React.useCallback(
    (value, allValues, formProps, name) => {
      const msg = atLeastOneIsRequiredError
        ? atLeastOneIsRequiredError(
            value,
            allValues,
            formProps,
            name,
            properties
          )
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

  const generateField = (field, key, index) => {
    const { type, ...otherField } = field;
    const hasRequired = required ? required.indexOf(key) > -1 : false;
    let fieldProps = {
      ...otherField
    };

    switch (type) {
      case 'text':
        fieldProps = {
          ...fieldProps,
          required: hasRequired,
          component: TextLoadingField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
      case 'textarea':
        fieldProps = {
          ...fieldProps,
          multiline: true,
          required: hasRequired,
          component: TextLoadingField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
      case 'date':
        fieldProps = {
          ...fieldProps,
          required: hasRequired,
          component: PickerField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
      case 'radioGroup':
        fieldProps = {
          ...fieldProps,
          required: hasRequired,
          component: RadioInputGroupField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
      case 'checkboxGroup':
        fieldProps = {
          ...fieldProps,
          required: hasRequired,
          component: CheckboxInputGroupField,
          validate: hasRequired ? atLeastOneIsRequired : undefined
        };
        break;
      case 'boolean':
        fieldProps = {
          ...fieldProps,
          required: hasRequired,
          component: CheckboxField
        };
        break;
      case 'select':
        fieldProps = {
          ...fieldProps,
          MuiTextFieldProps: {
            ...fieldProps.MuiTextFieldProps,
            required: hasRequired
          },
          component: ReactSelectField,
          validate: hasRequired ? isRequired : undefined
        };
        break;
      default:
        warning(
          false,
          `[@e-group/material-form] SchemaFields: Unknown field type="${type}".`
        );
        return undefined;
    }
    if (renderField) {
      return renderField(fieldProps, { schema, key, index, fieldType: type });
    }
    return <Field key={fieldProps.name} {...fieldProps} />;
  };

  return Object.keys(properties).map((key, index) =>
    generateField(properties[key], key, index)
  );
};

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
