export type CcyformatOptions = {
  round?: boolean;
  maximumFractionDigits?: number;
};

/**
 * format currency
 */
const ccyformat = (
  currency: string | number,
  options: CcyformatOptions = {}
) => {
  const { round, maximumFractionDigits = 6 } = options;

  let nextCurrency = Number(Number(currency).toFixed(6));
  if (round) {
    nextCurrency = Math.round(nextCurrency);
  }
  return nextCurrency.toLocaleString(undefined, {
    maximumFractionDigits,
  });
};

export default ccyformat;
