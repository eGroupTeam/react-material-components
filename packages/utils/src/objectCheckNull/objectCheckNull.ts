/**
 * Check if object keys with null or undefined value(Shallow).
 */
export default function objectCheckNull<P>(obj: P) {
  const originLength = Object.keys(obj).length;
  const vaildLength = Object.values(obj).filter((el) => el != null).length;
  return originLength !== vaildLength;
}
