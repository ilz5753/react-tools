import forEach from "lodash.foreach";
import includes from "lodash.includes";
import indexOf from "lodash.indexof";
import type { TKey } from "../../type";
import type { IEventEmitter, TCallback, TEvents } from "./type";
export default class EventEmitter implements IEventEmitter {
  private events: TEvents = {};
  on(name: TKey, callback: TCallback) {
    let events: TCallback[] = [];
    if (name in this.events) events = this.events[name] ?? [];
    events.push(callback);
    this.events[name] = events;
    return () => this.off(name, callback);
  }
  off(name: TKey, callback: TCallback) {
    if (name in this.events) {
      let events = this.events[name] ?? [];
      if (includes(events, callback)) {
        let index = indexOf(events, callback);
        events.splice(index, 1);
        this.events[name] = events;
      }
    }
  }
  offAll() {
    this.events = {};
  }
  emit(name: TKey, ...args: any[]) {
    if (name in this.events) {
      let events = this.events[name];
      forEach(events, (callback) => callback(...args));
    }
  }
}
