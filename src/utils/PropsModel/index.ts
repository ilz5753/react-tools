import type { TKey } from "../../type";
import type { IPropsModel } from "./type";

export default class PropsModel implements IPropsModel {
  private id: TKey;
  private props: object;
  constructor(id: TKey, props: object = {}) {
    this.id = id;
    this.props = props;
  }
  getId() {
    return this.id;
  }
  setId(id: TKey) {
    this.id = id;
  }
  getProps() {
    return this.props;
  }
  setProps(props: object = {}) {
    this.props = props;
  }
}
