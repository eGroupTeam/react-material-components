/**
 * Change action type to camalize style.
 * Example,
 * COMPONENTS/FETCH_GET_USER -> components/fetchGetUser
 */
export default function camalize(str: string) {
  if (str === str.toUpperCase()) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9/]+(.)/g, (m, chr) => chr.toUpperCase());
  }
  return str;
}
