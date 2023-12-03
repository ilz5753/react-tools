import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ComponentType,
  type PropsWithChildren,
} from "react";
import type { TKey } from "../type";
import useContext from "../useContext";
import { forgottonProviderMessage, randomStringId } from "../utils";
import type { IFreeze, IFreezeProps, TFreezePropsKey } from "./type";

const FreezeContext = createContext<IFreeze | null>(null);

export const useFreeze = () =>
  useContext(FreezeContext, forgottonProviderMessage("Freeze", "react-tools"));

export function MakeFreeze<T extends IFreezeProps>(
  Component: ComponentType<T>
) {
  let id = randomStringId();
  let FreezedComponent = (props: Omit<T, TFreezePropsKey>) => {
    const { frozenComponents, freeze, unfreeze } = useFreeze();
    const isFrozen = useMemo(() => id in frozenComponents, [frozenComponents]);
    let _unfreeze = useCallback(() => unfreeze(id), [unfreeze]);
    let _freeze = useCallback(
      () => freeze(id, props as object),
      [freeze, props]
    );
    const toggleFreeze = useCallback(isFrozen ? _unfreeze : _freeze, [
      isFrozen,
      _freeze,
      _unfreeze,
    ]);
    const currentProps = useMemo(
      () => (isFrozen ? frozenComponents[id] : (props as object)),
      [frozenComponents, props, isFrozen]
    );
    return (
      <Component
        {...{
          ...(currentProps! as T),
          freezeId: id,
          isFrozen,
          toggleFreeze,
          unfreeze: _unfreeze,
          freeze: _freeze,
        }}
      />
    );
  };
  return {
    id,
    FreezedComponent,
  };
}

export default function FreezeProvider({ children }: PropsWithChildren) {
  const [frozenComponents, setFrozenComponents] = useState<
    Record<TKey, object>
  >({});
  const freeze = useCallback(
    (id: TKey, props: object) =>
      setFrozenComponents((prev) => ({ ...prev, [id]: props })),
    []
  );
  const unfreeze = useCallback(
    (id: TKey) =>
      setFrozenComponents((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      }),
    []
  );
  return (
    <FreezeContext.Provider
      {...{ value: { frozenComponents, freeze, unfreeze }, children }}
    />
  );
}
