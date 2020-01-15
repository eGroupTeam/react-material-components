import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form/immutable';
import TextLoadingField from '@e-group/material-form/TextLoadingField';
import RadioGroupField from '@e-group/material-form/RadioGroupField';
import CheckboxInputGroupField from '@e-group/material-form/CheckboxInputGroupField';
import CheckboxField from '@e-group/material-form/CheckboxField';

const oneIsRequired = value => (!value ? '「」是必選欄位' : undefined);
const atLeastOneIsRequired = value => {
  if (!value) {
    return '「」需至少選擇一項';
  }
  const checks = value.filter(el => el.get('checked'));
  if (checks.size === 0) {
    return '「」需至少選擇一項';
  }
  return undefined;
};
const textIsRequired = value => (!value ? '「」是必填欄位' : undefined);

const SchemaFields = ({ schema }) => {
  const { fields } = schema;
  const generateField = field => {
    const { type, ...fieldOptions } = field;
    let fieldProps = fieldOptions;
    switch (field.type) {
      case 'rating':
      case 'choiceone':
        fieldProps = {
          ...fieldProps,
          component: RadioGroupField,
          validate: fieldProps.required ? oneIsRequired : undefined
        };
        break;
      case 'choicemulti':
        fieldProps = {
          ...fieldProps,
          component: CheckboxInputGroupField,
          validate: fieldProps.required ? atLeastOneIsRequired : undefined
        };
        break;
      case 'text':
        fieldProps = {
          ...fieldProps,
          component: TextLoadingField,
          validate: fieldProps.required ? textIsRequired : undefined
        };
        break;
      case 'boolean':
        fieldProps = {
          ...fieldProps,
          component: CheckboxField
        };
        break;
      default:
        break;
    }
    return (
      <Field
        key={fieldProps.name}
        required={fieldProps.required}
        {...fieldProps}
      />
    );
  };

  return fields.map(generateField);
};

const fieldPropType = PropTypes.shape({
  type: PropTypes.oneOf([
    'rating',
    'choiceone',
    'choicemulti',
    'text',
    'boolean'
  ]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array
});

SchemaFields.propTypes = {
  schema: PropTypes.shape({
    fields: PropTypes.arrayOf(fieldPropType).isRequired
  }).isRequired
};

export default SchemaFields;
