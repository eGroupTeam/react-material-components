export default function getShouldFetch<P>(params: P) {
  const paramsLength = Object.keys(params).length;
  const vaildParamsLength = Object.values(params).filter((el) => el != null)
    .length;
  return paramsLength === vaildParamsLength;
}
