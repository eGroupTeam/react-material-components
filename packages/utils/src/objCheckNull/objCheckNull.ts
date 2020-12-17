/**
 * Check if object key with null or undefined value(Shallow).
 */
export default function objCheckNull<P>(params: P) {
  const paramsLength = Object.keys(params).length;
  const vaildParamsLength = Object.values(params).filter((el) => el != null)
    .length;
  return paramsLength !== vaildParamsLength;
}
