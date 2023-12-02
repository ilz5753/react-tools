import { TEmptyVoid, TKey } from "../../type";

export type TCallback = (...args: any[]) => void;
export type TEvents = Record<TKey, TCallback[]>;

export interface IEventEmitter {
  on(name: TKey, callback: TCallback): TEmptyVoid;
  off(name: TKey, callback: TCallback): void;
  offAll(): void;
  emit(name: TKey, ...args: any[]): void;
}
