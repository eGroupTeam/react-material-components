/**
 * Parse api action type to its method and processing type.
 * Example,
 * FETCH_GET_USER -> ['get', undefined]
 * FETCH_GET_USER_REQUEST -> ['get', 'request']
 */
export default function getApiInfos(api: string) {
  let apiType: string | undefined;
  const array = api.split(/(?=[A-Z])/);
  const apiMethod = array[1];
  apiType = array[array.length - 1].toLowerCase();
  if (
    apiType !== 'request' &&
    apiType !== 'cancel' &&
    apiType !== 'success' &&
    apiType !== 'failure'
  ) {
    apiType = undefined;
  }
  return [apiMethod, apiType];
}
