import { ComponentType } from "react";

export type TKey = string | number;
export type TEmptyVoid = () => void;
export interface IId {
  id: TKey;
}
export interface IPid {
  pid: TKey;
}
export interface IIDs extends IId, IPid {}
export type IIDsKeys = keyof IIDs;
export interface IName {
  name: string;
}
export interface IComponent {
  Component: ComponentType;
}
export interface IProps {
  props?: object;
}
export interface ITree<T> {
  value: T;
  children: ITree<T>[];
}
