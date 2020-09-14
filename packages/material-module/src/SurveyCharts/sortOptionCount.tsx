import { Option } from './types';

const sortOptionCount = (a: Option, b: Option) => {
  if (a.optionCount > b.optionCount) return -1;
  return 0;
};

export default sortOptionCount;
