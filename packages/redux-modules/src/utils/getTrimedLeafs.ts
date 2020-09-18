import camalize from './camalize';
import findFetchIndex from './findFetchIndex';
import trimLeafs from './trimLeafs';

const getTrimedLeafs = (actionType: string) => {
  const leafs = camalize(actionType).split('/');
  const fetchIndex = findFetchIndex(leafs);
  return trimLeafs(leafs, fetchIndex);
};

export default getTrimedLeafs;
