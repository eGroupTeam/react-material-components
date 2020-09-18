import mergeWith from 'lodash.mergewith';

export default function merger(a, b) {
  if (a && typeof a === 'object' && !Array.isArray(a) && !Array.isArray(b)) {
    return mergeWith(a, b, merger);
  }
  return b;
}
