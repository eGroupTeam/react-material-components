import findIndex from 'lodash/findIndex';

/**
 * To index string array that include "fetch"
 */
const findFetchIndex = (leafs: string[]) =>
  findIndex(leafs, (leaf) => leaf.indexOf('fetch') !== -1);

export default findFetchIndex;
