import { IComponent, IIDs, IIDsKeys, IName, IProps, TKey } from "../type";

export interface INavigationScreen extends IIDs, IName, IComponent, IProps {
  type: TKey;
}
export interface INavigation {
  ids: IIDs[];
  history: TKey[];
  createScreen: (screen: INavigationScreen) => void;
  updateScreen: (
    id: TKey,
    screen: Partial<Omit<INavigationScreen, IIDsKeys>>
  ) => void;
  deleteScreen: (id: TKey) => void;
  navigate: (name: string, props?: object) => void;
  goBack: () => void;
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
  history?: TKey[];
  updateIds?(ids: IIDs[]): void;
  // animationCallbacks?: INavigationAnimations;
}
export type INavigationHookResult = INavigation;
