import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import items from "./items";
import focus from './focus'
import isImporting from './is-importing'

export default combineReducers({
  routing: routerReducer,
  focus,
  isImporting,
  items,
});
