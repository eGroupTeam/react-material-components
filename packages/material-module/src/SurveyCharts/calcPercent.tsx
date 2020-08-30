const calcPercent = (a?: number, b?: number) => {
  if (typeof a === 'number' && typeof b === 'number') {
    if (b === 0) {
      return '0%';
    }
    return `${Math.round((a / b) * 100 * 100) / 100}%`;
  }
  return NaN;
};

export default calcPercent;
