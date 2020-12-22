export default function groupBy<TItem>(
  xs: TItem[],
  key: string | ((item: TItem) => string | number)
) {
  return xs.reduce((rv, x) => {
    const v = key instanceof Function ? key(x) : x[key];
    // Not use copy for better performance
    // eslint-disable-next-line no-param-reassign
    (rv[v] = rv[v] || []).push(x);
    return rv;
  }, {});
}
