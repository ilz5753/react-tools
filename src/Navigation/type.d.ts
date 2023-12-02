import { IComponent, IIDs, IIDsKeys, IName, IProps, TKey } from "../type";

export interface INavigationScreen extends IIDs, IName, IComponent, IProps {
  type: TKey;
}
export interface INavigation {
  ids: IIDs[];
  createScreen: (screen: INavigationScreen) => void;
  updateScreen: (id: TKey, screen: Omit<INavigationScreen, IIDsKeys>) => void;
  deleteScreen: (id: TKey) => void;
}
export type TNavigationAnimationCallback = (
  currentIndex: number,
  startIndex?: number,
  endIndex?: number
) => Promise<void>;
export interface INavigationAnimations {
  entering: TNavigationAnimationCallback;
  exiting: TNavigationAnimationCallback;
}
export interface INavigationHookData {
  ids?: IIDs[];
  updateIds?(ids: IIDs[]): void;
  // animationCallbacks?: INavigationAnimations;
}
