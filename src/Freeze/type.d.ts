import { TEmptyVoid, TKey } from "../type";
import { IPropsModel } from "../utils/PropsModel/type";

export interface IFreezeProps {
  freezeId?: string;
  isFrozen?: boolean;
  toggleFreeze: () => void;
  freeze: () => void;
  unfreeze: () => void;
}
export type TFreezePropsKey = keyof IFreezeProps;

export interface IFreeze {
  frozenComponents: Record<TKey, object>;
  freeze: (id: TKey, props: object) => void;
  unfreeze: (id: TKey) => void;
}
