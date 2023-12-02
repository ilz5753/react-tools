import { ComponentType, PropsWithChildren } from "react";
import { TKey } from "../type";

export type TErrorPosition = "top" | "middle" | "bottom";
export type TErrorAnimation = "fade" | "slide" | "mix";
export interface IErrorAction {
  label: string;
  onFired(code: number): void;
}
export interface IErrorData {
  title: string;
  description: string;
  actions?: IErrorAction[];
  code: number;
}
export type TErrorRender = ComponentType<IErrorData>;
export interface IErrorItem {
  id: TKey;
  position?: TErrorPosition;
  animation?: TErrorAnimation;
  isVisible?: boolean;
  duration?: number;
  ErrorRender?: TErrorRender;
  props?: IErrorData;
}
export interface IErrorHandler {
  updateDefaultErrorRender(Render: TErrorRender): void;
  create(error: IErrorItem): void;
  read(id: TKey): IErrorItem | undefined;
  update(id: TKey, newError: Partial<Omit<IErrorItem, "id">>): void;
  delete(id: TKey): void;
  show(id: TKey, data?: IErrorData): void;
  hide(id: TKey): void;
}
export interface IErrorHandlerProvider extends PropsWithChildren {
  RenderOverlayErrorWrapper: ComponentType<{
    ErrorRender?: TErrorRender;
    errorItems: IErrorItem[];
  }>;
}
