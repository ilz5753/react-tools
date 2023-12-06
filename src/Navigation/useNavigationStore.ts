import isFunction from "lodash.isfunction";
import map from "lodash.map";
import { useCallback, useEffect, useRef, useState } from "react";
import type { IIDs, IIDsKeys, TEmptyVoid, TKey } from "../type";
// import { emptyPromise } from "../utils";
import includes from "lodash.includes";
import indexOf from "lodash.indexof";
import PropsModel from "../utils/PropsModel";
import NavigationEventEmitter, {
  CREATE_SCREEN,
  DELETE_SCREEN,
  NavigationModel,
  UPDATE_IDS,
  UPDATE_SCREEN,
} from "./NavigationEventEmitter";
import type {
  INavigationHookData,
  INavigationHookResult,
  INavigationScreen,
} from "./type";

export default function useNavigationStore({
  ids: data = [],
  history: stack = [],
  updateIds,
}: // animationCallbacks = { entering: emptyPromise, exiting: emptyPromise },
INavigationHookData): INavigationHookResult {
  // let { entering, exiting } = animationCallbacks;
  let [ids, setIds] = useState(data);
  let [history, setHistory] = useState(stack);
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
    if (isFunction(callbackRef.current)) {
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
    (id: TKey, screen: Partial<Omit<INavigationScreen, IIDsKeys>>) =>
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
  let getScreens = useCallback(
    () =>
      map(NavigationModel.getModels(), ({ getProps }) =>
        getProps()
      ) as INavigationScreen[],
    []
  );
  let reRender = useCallback(() => {
    let screens = getScreens();
    let ids: IIDs[] = map(screens, ({ id, pid }) => ({ id, pid }));
    NavigationEventEmitter.emit(UPDATE_IDS, ids);
  }, [getScreens]);
  let navigate = useCallback(
    (name: string, props?: object) => {
      let copy = [...history];
      let screens = getScreens();
      let names = map(screens, ({ name }) => name);
      if (includes(names, name)) {
        let nIndex = indexOf(names, name);
        let nameId = screens[nIndex]!.id;
        if (includes(copy, nameId)) {
          let hIndex = indexOf(copy, nameId);
          copy.splice(0, hIndex);
        } else copy.push(nameId);
        updateScreen(nameId, { props });
        setHistory(copy);
      } else throw new Error(`No screen with name: "${name}".`);
    },
    [history, getScreens, updateScreen]
  );
  let goBack = useCallback(() => {
    let copy = [...history];
    let l = copy.length;
    if (l > 1) {
      copy.pop();
      setHistory(copy);
    } else throw new Error(`No screen for back.`);
  }, [history]);
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
    history,
    createScreen,
    updateScreen,
    deleteScreen,
    navigate,
    goBack,
  };
}
