import { fromJS, List, isImmutable, Map } from '@e-group/immutable';

/**
 * If formatter value is string or boolean get the correct option format for react select.
 * Option format example, { value: 'foo', label: 'bar' }.
 */
function getFormattedSelectOption({
  value,
  labelPath,
  valuePath,
  selectOptions,
}) {
  if (typeof value === 'string' || typeof value === 'number') {
    if (selectOptions) {
      const selectedOption = selectOptions.filter(
        (el) => el[valuePath] === value
      )[0];
      if (selectedOption) {
        return fromJS(selectedOption);
      }
    }
    return fromJS({
      label: value,
      value,
    });
  }
  if (Map.isMap(value)) {
    return fromJS({
      ...value.toJS(),
      label: value.getIn(labelPath),
      value: value.getIn(valuePath),
    });
  }
  return value;
}

/**
 * Make react select redux form formatter.
 * @param {*} options
 * @param {array} options.labelPath
 * @param {array} options.valuePath
 */
export function makeReactSelectFormatter(options = {}) {
  const {
    labelPath = ['label'],
    valuePath = ['value'],
    options: selectOptions,
  } = options;
  return function formatter(value, name) {
    if (List.isList(value)) {
      return value.map((el) =>
        getFormattedSelectOption({
          value: el,
          labelPath,
          valuePath,
          selectOptions,
        })
      );
    }
    return getFormattedSelectOption({
      value,
      labelPath,
      valuePath,
      selectOptions,
    });
  };
}

/**
 * If react select options value is immutable Map get the correct value format to store in redux form.
 */
function getNormalizedReduxFormValue({ value, disableReturnStringValue }) {
  if (Map.isMap(value)) {
    if (disableReturnStringValue) {
      return value.deleteAll(['label', 'value']);
    }
    return value.get('value');
  }
  return value;
}

/**
 * Make react select redux form normalizer.
 * @param {*} options
 * @param {boolean} options.disableReturnStringValue set `true` to disable return String value
 */
export function makeReactSelectNormalizer(options = {}) {
  const { disableReturnStringValue } = options;
  return function normalizer(
    value,
    previousValue,
    allValues,
    previousAllValues,
    name
  ) {
    if (isImmutable(value)) {
      if (List.isList(value)) {
        return value.map((el) =>
          getNormalizedReduxFormValue({
            value: el,
            disableReturnStringValue,
          })
        );
      }
      return getNormalizedReduxFormValue({
        value,
        disableReturnStringValue,
      });
    }
    return value;
  };
}

/**
 * Parse react options for react select.
 * @param {*} options
 * @param {array} options.labelPath
 * @param {array} options.valuePath
 */
export function parseReactSelectOptions(options = {}) {
  const { labelPath = [], valuePath = [], options: selectOptions } = options;
  return selectOptions.map((el) => ({
    ...el,
    label: fromJS(el).getIn(labelPath),
    value: fromJS(el).getIn(valuePath),
  }));
}
