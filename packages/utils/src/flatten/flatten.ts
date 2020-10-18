export type FlattenResult = {
  [key: string]: string;
};

export default function flatten(obj: any) {
  const result: FlattenResult = {};

  function traverseAndFlatten(currentNode: any, flattenedKey?: string) {
    Object.keys(currentNode).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(currentNode, key)) {
        let newKey;
        if (flattenedKey === undefined) {
          newKey = key;
        } else {
          newKey = `${flattenedKey}.${key}`;
        }

        const value = currentNode[key];
        if (typeof value === 'object') {
          traverseAndFlatten(value, newKey);
        } else {
          result[newKey] = value;
        }
      }
    });
  }

  traverseAndFlatten(obj);
  return result;
}
