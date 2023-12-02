import { TKey } from "../../type";

export interface IPropsModel {
  getId(): TKey;
  setId(id: TKey): void;
  getProps(): object;
  setProps(props?: object): void;
}
