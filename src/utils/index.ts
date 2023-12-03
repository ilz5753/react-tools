import includes from "lodash.includes";
import isUndefined from "lodash.isundefined";
import map from "lodash.map";
import type { IIDs, ITree, TKey } from "../type";

export const forgottonProviderMessage = (name: string, source: string) =>
  `Please wrap your root element inside of \`${name}Provider\` component.\nyou can import it from '${source}'.`;
const randomStringIdGen = () => {
  let id = 0;
  return () => {
    id += 1;
    return `${id}`;
  };
};
export function invariant(
  condition: boolean,
  message: string
): asserts condition {
  if (!condition) throw new Error(message);
}
export const randomStringId = Object.freeze(randomStringIdGen());
export function GenerateTreeFromArray(ids: IIDs[], rootId: TKey) {
  let justIds = map(ids, ({ id }) => id);
  invariant(includes(justIds, rootId), "You forgot pass root id.");
  let tree: Record<TKey, ITree<IIDs>> = {};
  for (let { id, pid } of ids) tree[id] = { value: { id, pid }, children: [] };
  for (let { id, pid } of ids) {
    let parent = tree[pid];
    if (!isUndefined(parent)) parent.children.push(tree[id]!);
  }
  return tree[rootId];
}
export const emptyPromise = async () => {};
