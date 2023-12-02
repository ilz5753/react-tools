import EventEmitter from "../utils/EventEmitter";
import Model from "../utils/model";

const NavigationEventEmitter = Object.freeze(new EventEmitter());

export const CREATE_SCREEN = "CREATE_SCREEN";
export const READ_SCREEN = "READ_SCREEN";
export const UPDATE_SCREEN = "UPDATE_SCREEN";
export const DELETE_SCREEN = "DELETE_SCREEN";
export const UPDATE_IDS = "UPDATE_IDS";

export const NavigationModel = Object.freeze(new Model());

export default NavigationEventEmitter;
