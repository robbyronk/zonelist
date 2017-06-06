import {combineReducers} from "redux";
import items from "./items";
import focus from './focus'
import is from './is'
import view from './view'

export default combineReducers({
  focus,
  is,
  items,
  view,
});
