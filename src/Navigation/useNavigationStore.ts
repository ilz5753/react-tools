import isFunction from "lodash.isfunction";
import isUndefined from "lodash.isundefined";
import map from "lodash.map";
import { useCallback, useEffect, useRef, useState } from "react";
import type { IIDs, IIDsKeys, TEmptyVoid, TKey } from "../type";
// import { emptyPromise } from "../utils";
import PropsModel from "../utils/PropsModel";
import NavigationEventEmitter, {
  CREATE_SCREEN,
  DELETE_SCREEN,
  NavigationModel,
  UPDATE_IDS,
  UPDATE_SCREEN,
} from "./NavigationEventEmitter";
import type { INavigationHookData, INavigationScreen } from "./type";

export default function useNavigationStore({
  ids: data = [],
  updateIds,
}: // animationCallbacks = { entering: emptyPromise, exiting: emptyPromise },
INavigationHookData) {
  // let { entering, exiting } = animationCallbacks;
  let [ids, setIds] = useState(data);
  let callbackRef = useRef<TEmptyVoid>();
  let updateIDs = useCallback(
    (ids: IIDs[]) => {
      setIds(ids);
      if (isFunction(updateIds)) updateIds(ids);
    },
    [updateIds]
  );
  let registerUpdateIds = useCallback(() => {
    callbackRef.current = NavigationEventEmitter.on(
      UPDATE_IDS,
      (ids: IIDs[]) => {
        updateIDs(ids);
      }
    );
  }, [updateIDs]);
  let unregisterUpdateIds = useCallback(() => {
    if (!isUndefined(callbackRef.current)) {
      callbackRef.current();
      callbackRef.current = undefined;
    }
  }, []);
  let createScreen = useCallback(
    (screen: INavigationScreen) => {
      NavigationEventEmitter.emit(CREATE_SCREEN, screen);
      // await entering(0, 0, 0);
    },
    // [entering]
    []
  );
  let updateScreen = useCallback(
    (id: TKey, screen: Omit<INavigationScreen, IIDsKeys>) =>
      NavigationEventEmitter.emit(UPDATE_SCREEN, id, screen),
    []
  );
  let deleteScreen = useCallback(
    (id: TKey) => {
      // await exiting(0, 0, 0);
      NavigationEventEmitter.emit(DELETE_SCREEN, id);
    },
    // [exiting]
    []
  );
  let reRender = useCallback(() => {
    let screens = map(NavigationModel.getModels(), ({ getProps }) =>
      getProps()
    ) as INavigationScreen[];
    let ids: IIDs[] = map(screens, ({ id, pid }) => ({ id, pid }));
    NavigationEventEmitter.emit(UPDATE_IDS, ids);
  }, []);
  useEffect(() => {
    NavigationModel.setUpdater(reRender);
    registerUpdateIds();
    let create = NavigationEventEmitter.on(
      CREATE_SCREEN,
      (screen: INavigationScreen) =>
        NavigationModel.create(new PropsModel(screen.id, screen))
    );
    let update = NavigationEventEmitter.on(
      UPDATE_SCREEN,
      (id: TKey, screen: Omit<INavigationScreen, IIDsKeys>) =>
        NavigationModel.update(id, screen)
    );
    let Delete = NavigationEventEmitter.on(DELETE_SCREEN, (id: TKey) =>
      NavigationModel.delete(id)
    );
    return () => {
      create();
      update();
      Delete();
      unregisterUpdateIds();
    };
  }, [registerUpdateIds, unregisterUpdateIds, reRender]);
  return {
    ids,
    createScreen,
    updateScreen,
    deleteScreen,
  };
}
