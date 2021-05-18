import { Key } from 'react';

/**
 * Customized render function for each element.
 */
export type RenderEach = (item: DisplayValuesSchemaItem) => void;

export type Value = string | number | undefined;

export type DisplayValuesSchemaItem = {
  key?: Key;
  /**
   * If value is undefined or empty array it'll return undefined.
   */
  value?: Value | Value[];
  /**
   * If render function is exist it'll excute render function instead of renderEach.
   */
  render?: RenderEach;
};

/**
 * Defined displayValues schema.
 */
export type DisplayValuesSchema = DisplayValuesSchemaItem[];

/**
 * To displayValues by schema.
 */
export default function displayValues(
  schema: DisplayValuesSchema,
  renderEach: RenderEach
) {
  return schema.map((item) => {
    const plainValue = item.value;
    const valueType = typeof plainValue;
    if (valueType === 'boolean' && !plainValue) {
      return undefined;
    }
    if (valueType === 'undefined') {
      return undefined;
    }

    if (Array.isArray(plainValue) && plainValue.filter(Boolean).length === 0) {
      return undefined;
    }
    if (valueType === 'string' && plainValue === '') {
      return undefined;
    }
    if (typeof item.render === 'function') {
      return item.render(item);
    }
    return renderEach(item);
  });
}
