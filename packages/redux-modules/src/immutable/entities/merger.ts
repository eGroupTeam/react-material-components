import { List } from '@e-group/immutable';

const { isList } = List;

export default function merger(a, b) {
  if (a && a.mergeWith && !isList(a) && !isList(b)) {
    return a.mergeWith(merger, b);
  }
  return b;
}
