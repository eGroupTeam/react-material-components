/**
 * Check if object key with null or undefined value(Shallow).
 */
export default function objectCheckNull<P>(params: P) {
  const paramsLength = Object.keys(params).length;
  const vaildParamsLength = Object.values(params).filter((el) => el != null)
    .length;
  return paramsLength !== vaildParamsLength;
}
