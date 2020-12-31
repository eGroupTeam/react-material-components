import getIn from '../getIn';

export type Options<T> = {
  options: T[];
  labelPath: string[];
  valuePath: string[];
};
/**
 * Parse react options for react select.
 */
export default function parseReactSelectOptions<T>(options: Options<T>) {
  const { labelPath = [], valuePath = [], options: selectOptions } = options;
  return selectOptions.map((el) => ({
    ...el,
    label: getIn(el, labelPath),
    value: getIn(el, valuePath),
  }));
}
