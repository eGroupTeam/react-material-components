/**
 * Trim leafs to used by api reducer.
 * Example,
 * [ 'components', 'list', 'fetchGetMemberRequest' ] -> [ 'components', 'list', 'fetchGetMember' ]
 * @param {array} leafs
 * @param {number} fetchIndex
 */
export default function trimLeafs(leafs: string[], fetchIndex: number) {
  const trimedLeafs = [...leafs];
  trimedLeafs[fetchIndex] = trimedLeafs[fetchIndex].replace(
    /Request|Cancel|Success|Failure/,
    ''
  );
  return trimedLeafs;
}
