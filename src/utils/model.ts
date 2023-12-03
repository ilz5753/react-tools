import includes from "lodash.includes";
import indexOf from "lodash.indexof";
import map from "lodash.map";
import noop from "lodash.noop";
import type { TEmptyVoid, TKey } from "../type";
import PropsModel from "./PropsModel";
import type { IPropsModel } from "./PropsModel/type";

export default class Model {
  private models: IPropsModel[];
  private updater: TEmptyVoid;
  constructor(uiUpdater = noop) {
    this.models = [];
    this.updater = uiUpdater;
  }
  extractIds() {
    return map(this.models, ({ getId }) => getId());
  }
  create(model: IPropsModel) {
    if (!includes(this.extractIds(), model.getId())) this.models.push(model);
    this.updater();
  }
  read(id: TKey) {
    let ids = this.extractIds();
    let pm: IPropsModel = new PropsModel(id);
    if (includes(ids, id)) {
      let index = indexOf(ids, id);
      pm = this.models[index]!;
    }
    return pm;
  }
  update(id: TKey, props: object = {}) {
    let ids = this.extractIds();
    if (includes(ids, id)) {
      let index = indexOf(ids, id);
      let item = this.models[index]!;
      let prevProps = item.getProps();
      item.setProps({ ...prevProps, ...props });
      this.updater();
    }
  }
  delete(id: TKey) {
    let ids = this.extractIds();
    if (includes(ids, id)) {
      let index = indexOf(ids, id);
      this.models.splice(index, 1);
      this.updater();
    }
  }
  getModels() {
    return this.models;
  }
  setUpdater(uiUpdater: TEmptyVoid = noop) {
    this.updater = uiUpdater;
  }
}
